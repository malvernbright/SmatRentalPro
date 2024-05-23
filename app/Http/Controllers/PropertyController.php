<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePropertyRequest;
use App\Http\Requests\UpdatePropertyRequest;
use App\Models\Property;
use Illuminate\Support\Facades\Validator;

class PropertyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $properties = Property::all();
        // return view('properties.index', compact('properties'));
        return $properties;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('properties.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePropertyRequest $request)
    {
        try {
            //Validated
            $validateData = Validator::make(
                $request->all(),
                [
                    'title' => 'required',
                ]
            );

            if ($validateData->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateData->errors()
                ], 400);
            }

            $property = new Property();
            $property->title = $request->title;
            $property->description = $request->input('description');
            $property->size = $request->input('size');
            $property->property_image = $request->file('property_image')->store('public/images');
            $property->owner_id = auth()->user()->id;
            $property->save();
            // return redirect()->route('properties.index');
            return response()->json([
                'status' => true,
                'message' => 'Property Created Successfully',
                'data' => $property
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Property $property)
    {
        return view('properties.show', compact('property'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Property $property)
    {
        // if($property->owner_id === auth()->user()->id)
        return view('properties.edit', compact('property'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePropertyRequest $request, Property $property)
    {
        $property = new Property();
        $property->title = $request->input('title');
        $property->description = $request->input('description');
        $property->size = $request->input('size');
        $property->property_image = $request->file('property_image')->store('public/images');
        $property->owner_id = auth()->user()->id;
        $property->save();
        return redirect()->route('properties.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Property $property)
    {
        $property->delete();
        return redirect()->route('properties.index');
    }
}
