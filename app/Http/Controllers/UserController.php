<?php

namespace App\Http\Controllers;

use App\Api\WeatherApi;
use App\Models\User;
use Hash;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Users/Index', [
            'users' => User::all(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
        ]);

        $apiResponse = WeatherApi::getInstance()->storeUser(
            email: $request['email'],
            name: $request['name'],
        );

        if ($apiResponse->isSuccessful()) {
            $generatedPassword = $apiResponse->getGeneratedPassword();

            User::create([
                'email' => $request['email'],
                'name' => $request['name'],
                'password' => Hash::make($generatedPassword),
                'generated_password' => $generatedPassword,
            ]);
        }

        return to_route('users.index');
    }
}
