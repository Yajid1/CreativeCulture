<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class AiAssistantController extends Controller
{
    /**
     * Handle incoming chat requests to the AI Assistant using Gemini API.
     */
    public function chat(Request $request): JsonResponse
    {
        $request->validate([
            'prompt' => 'required|string|max:4000',
            'model' => 'nullable|string',
            'history' => 'nullable|array',
        ]);

        $userPrompt = $request->input('prompt');
        $selectedModel = $request->input('model', 'Gemini 3 Flash');
        $history = $request->input('history', []);

        $apiKey = env('GEMINI_API_KEY', config('services.gemini.key'));

        // Map frontend model names to Gemini API model identifiers
        $geminiModel = match ($selectedModel) {
            'Gemini 3 Pro', 'Claude 3.5 Sonnet', 'GPT-4o' => 'gemini-1.5-pro',
            default => 'gemini-1.5-flash',
        };

        // System prompt context for UPTD Kebudayaan Kota Bandung
        $systemInstructionText = 'Anda adalah AI Assistant cerdas dan profesional untuk UPTD Kebudayaan Kota Bandung. '
            .'Anda bertugas membantu pengelola/admin UPTD Kebudayaan dalam menyusun publikasi artikel, berita kebudayaan, '
            .'pengelolaan fasilitas (Bandung Creative Hub, Padepokan Seni Mayang Sunda, Teras Sunda Cibiru, dan Kampung Wisata Pasir Kunci), '
            .'analisis reservasi ruangan, serta informasi seputar pelestarian seni dan budaya Sunda di Kota Bandung. '
            .'Berikan jawaban yang ramah, tepat, informatif, dan terstruktur dalam Bahasa Indonesia.';

        // Build contents payload
        $contents = [];

        // Append historical chat if provided
        foreach ($history as $msg) {
            if (isset($msg['sender']) && isset($msg['text'])) {
                $contents[] = [
                    'role' => $msg['sender'] === 'user' ? 'user' : 'model',
                    'parts' => [['text' => $msg['text']]],
                ];
            }
        }

        // Add current user prompt
        $contents[] = [
            'role' => 'user',
            'parts' => [['text' => $userPrompt]],
        ];

        $payload = [
            'system_instruction' => [
                'parts' => [['text' => $systemInstructionText]],
            ],
            'contents' => $contents,
            'generationConfig' => [
                'temperature' => 0.7,
                'topK' => 40,
                'topP' => 0.95,
                'maxOutputTokens' => 2048,
            ],
        ];

        // Attempt calling primary model then fallback models
        $candidateModels = [$geminiModel, 'gemini-1.5-flash', 'gemini-2.0-flash', 'gemini-1.5-pro'];
        $replyText = null;
        $apiSuccess = false;

        if (! empty($apiKey)) {
            foreach (array_unique($candidateModels) as $modelName) {
                try {
                    // Endpoint Google Gemini API
                    $url = "https://generativelanguage.googleapis.com/v1beta/models/{$modelName}:generateContent?key=".urlencode($apiKey);

                    $response = Http::withHeaders([
                        'Content-Type' => 'application/json',
                    ])->timeout(15)->post($url, $payload);

                    if ($response->successful()) {
                        $responseData = $response->json();
                        $generatedText = $responseData['candidates'][0]['content']['parts'][0]['text'] ?? null;
                        if (! empty($generatedText)) {
                            $replyText = trim($generatedText);
                            $apiSuccess = true;
                            break;
                        }
                    } else {
                        Log::warning("Gemini API call failed for model {$modelName}: ".$response->status().' '.$response->body());
                    }
                } catch (\Throwable $e) {
                    Log::error("Gemini API Exception for model {$modelName}: ".$e->getMessage());
                }
            }
        }

        // Fallback intelligent response if API key call returns unauthorized / error
        if (! $apiSuccess || empty($replyText)) {
            $replyText = $this->generateFallbackResponse($userPrompt);
        }

        return response()->json([
            'success' => true,
            'reply' => $replyText,
            'model' => $selectedModel,
            'api_connected' => $apiSuccess,
        ]);
    }

    /**
     * Contextual fallback response for UPTD Kebudayaan Admin
     */
    private function generateFallbackResponse(string $prompt): string
    {
        $promptLower = strtolower($prompt);

        if (str_contains($promptLower, 'fasilitas') || str_contains($promptLower, 'ruangan') || str_contains($promptLower, 'bch') || str_contains($promptLower, 'pasir kunci') || str_contains($promptLower, 'mayang sunda') || str_contains($promptLower, 'cibiru')) {
            return "UPTD Kebudayaan Kota Bandung mengelola 4 fasilitas utama:\n\n"
                ."1. **Bandung Creative Hub (BCH)** — Pusat pengembangan ekonomi kreatif, studio musik, animasi, auditorium, & coworking space.\n"
                ."2. **Padepokan Seni Mayang Sunda (PSMS)** — Ruang pertunjukan seni tradisi & teater Sunda.\n"
                ."3. **Teras Sunda Cibiru (TSC)** — Kawasan pelestarian seni kriya, saung padepokan, & panggung bambu.\n"
                ."4. **Kampung Wisata Pasir Kunci (KWPK)** — Destinasi seni budaya outdoor kaki Gunung Manglayang.\n\n"
                .'Ada informasi atau jadwal reservasi spesifik yang ingin Anda periksa?';
        }

        if (str_contains($promptLower, 'artikel') || str_contains($promptLower, 'berita') || str_contains($promptLower, 'kabar') || str_contains($promptLower, 'publikasi')) {
            return "Siap! Untuk publikasi artikel & berita UPTD Kebudayaan:\n\n"
                ."• **Fitur Artikel**: Dapat mengunggah kajian budaya, ulasan kesenian, dan dokumentasi program.\n"
                ."• **Fitur Berita**: Menyediakan terbitan berkala seperti *Kabar Kebudayaan*, *Warta Seni Sunda*, dan *Jurnal Budaya* dalam format buku interaktif.\n\n"
                .'Silahkan ketikkan topik atau draf tulisan yang ingin Anda buat ringkasannya!';
        }

        return "Terima kasih telah mengajukan pertanyaan mengenai **\"{$prompt}\"**.\n\n"
            .'Sebagai AI Assistant UPTD Kebudayaan Kota Bandung, saya siap membantu Anda mengelola data fasilitas, publikasi berita/artikel, serta analisis kegiatan kebudayaan. Apakah ada hal khusus terkait agenda atau laporan yang perlu disiapkan?';
    }
}
