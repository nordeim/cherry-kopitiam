<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Location;
use Illuminate\Http\JsonResponse;

class LocationController extends Controller
{
    /**
     * List all active locations
     */
    public function index(): JsonResponse
    {
        $locations = Location::active()
            ->orderBy('name')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $locations,
        ]);
    }

    /**
     * Get location details
     */
    public function show(string $id): JsonResponse
    {
        $location = Location::where('id', $id)
            ->orWhere('slug', $id)
            ->first();

        if (!$location) {
            return response()->json([
                'success' => false,
                'message' => 'Location not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $location,
        ]);
    }
}
