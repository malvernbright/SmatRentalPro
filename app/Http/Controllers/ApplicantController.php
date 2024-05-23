<?php

namespace App\Http\Controllers;

use App\Models\Applicant;
use App\Models\Property;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ApplicantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $applicants = Applicant::all();
        return $applicants;
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
    public function store(Request $request)
    {
        try {
            //Validated
            $validateData = Validator::make(
                $request->all(),
                [
                    'phone' => 'required',
                    'message' => 'required',
                ]
            );

            if ($validateData->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateData->errors()
                ], 400);
            }

            $applicant = new Applicant;
            $applicant->name = auth()->user()->name;
            $applicant->email = auth()->user()->email;
            $applicant->phone = $request->input('phone');
            $applicant->message = $request->input('message');
            $applicant->property_id = $request->input('property_id');
            $applicant->save();
            return response()->json([
                'status' => true,
                'message' => 'Application Made Successfully',
                'data' => $applicant
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
    public function show($id)
    {
        return Applicant::findOrFail($id);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Applicant $applicant)
    {
        // if($applicant->owner_id === auth()->user()->id)
        return view('properties.edit', compact('applicant'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $applicant = Applicant::firstWhere('id', $id);
        $applicant->title = $request->input('title');
        $applicant->description = $request->input('description');
        $applicant->size = $request->input('size');
        $applicant->applicant_image = $request->file('applicant_image')->store('public/images');
        $applicant->owner_id = auth()->user()->id;
        $applicant->save();
        return response()->json([
            'status' => true,
            'message' => 'Applicant Updated Successfully',
            'data' => $applicant,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Applicant $applicant)
    {
        $applicant->delete();
        return response()->json([
            'status' => true,
            'message' => 'Applicant Deleted Successfully',
            'data' => $applicant
        ], 200);
    }
}
