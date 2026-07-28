<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class FacilityController extends Controller
{
    public function bandungCreativeHub()
    {
        return Inertia::render('facilities/bandung-creative-hub');
    }
}