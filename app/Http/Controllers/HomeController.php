<?php

namespace App\Http\Controllers;

use App\Api\WeatherApi;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $api = WeatherApi::getInstance();

        return Inertia::render('Home', [
            'tempAndDownfall' => $api->fetchTempAndDownfall()->getRecords(),
            'topWindSpeeds' => $api->fetchTopWindSpeeds()->getRecords(),
        ]);
    }
}
