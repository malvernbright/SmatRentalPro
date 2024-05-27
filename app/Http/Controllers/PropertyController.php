<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePropertyRequest;
use App\Http\Requests\UpdatePropertyRequest;
use App\Models\Property;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Validator;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

class PropertyController extends Controller
{

    // public function __construct()
    // {
    //     $this->middleware('auth:api')->except('index');
    // }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $properties = Property::all();
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
                    'description' => 'required',
                    'size' => 'required',
                    'property_image' => 'image|mimes:jpeg,png,jpg,gif,svg|max:4096',
                    // 'property_image' => 'required',
                    'price' => 'required',
                    'tenure' => 'required',
                ]
            );

            if ($validateData->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateData->errors()
                ], 400);
            }

            $property = new Property;
            $property->title = $request->input('title');
            $property->description = $request->input('description');;
            $property->size = $request->input('size');
            $property->price = $request->input('price');
            $property->tenure = $request->input('tenure');

            if(!$request->hasFile('property_image')) {
                return response()->json(['upload_file_not_found'], 400);
            }
            $file = $request->file('property_image');
            if(!$file->isValid()) {
                return response()->json(['invalid_file_upload'], 400);
            }
            // $file = $request->file('property_image')->storeOnCloudinary('properties');
            $uploadedFileUrl = Cloudinary::upload($request->file('property_image')->getRealPath())->getSecurePath();


            // $uploadedFileUrl = $request->file('property_image')->store('property_images', 'public');
            // $filename = $file->store('public/properties');
            // $property->property_image = $filename;


            $property->property_image = $uploadedFileUrl;
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
                'message' => $th->getMessage(),
                'message2' => 'Nothing came through!'
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return Property::findOrFail($id);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, $id)
    {


        try {

            $property = Property::firstWhere('id', $id);
            $property->title = $request->input('title');
            $property->description = $request->input('description');;
            $property->size = $request->input('size');
            $property->price = $request->input('price');
            $property->tenure = $request->input('tenure');
            $file = $request->file('property_image');
            $path = public_path() . '/uploads/images/store/';
            $file->move($path, $file->getClientOriginalName());
            $property->property_image = $file->getClientOriginalName();
            $property->owner_id = auth()->user()->id;
            $property->save();
            // return redirect()->route('properties.index');
            return response()->json([
                'status' => true,
                'message' => 'Property Updated Successfully',
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
