<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Character;

class CharacterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $characters = Character::all();
        return response()->json($characters);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $character = new Character;
        $character -> name = $request -> name;
        $character -> franchise = $request -> franchise;
        $character -> save();
        return response()->json($character);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $character = Character::find($id);
        return response()->json($character);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
