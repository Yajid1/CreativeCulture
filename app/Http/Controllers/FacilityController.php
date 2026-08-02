<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class FacilityController extends Controller
{
    public function bandungCreativeHub()
    {
        return Inertia::render('facilities/bandung-creative-hub');
    }

    public function padepokanSeniMayangSunda()
    {
        return Inertia::render('facilities/padepokan-seni-mayang-sunda');
    }

    public function terasSundaCibiru()
    {
        return Inertia::render('facilities/teras-sunda-cibiru');
    }

    public function kampungWisataPasirKunci()
    {
        return Inertia::render('facilities/kampung-wisata-pasir-kunci');
    }
}
