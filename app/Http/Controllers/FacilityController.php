<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class FacilityController extends Controller
{
    public function bandungCreativeHub(): Response
    {
        return Inertia::render('facilities/bandung-creative-hub', [
            'facility' => [
                'name' => 'Bandung Creative Hub',
                'category' => 'Kreatif & Teknologi',
                'year' => 'Est. 2018',
                'description' => 'Bandung Creative Hub adalah pusat inovasi kreatif terbesar di Jawa Barat yang menyediakan ruang kolaborasi, studio rekaman, galeri seni, dan fasilitas teknologi canggih untuk mendukung para pelaku industri kreatif, seniman, desainer, dan entrepreneur muda Bandung.',
                'videoUrl' => '/videos/testing.mp4',
                'posterUrl' => '/images/bandung_creative_hub_hero.png',
            ],
        ]);
    }
}
