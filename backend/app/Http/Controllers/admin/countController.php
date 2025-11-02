<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Doctor;

class countController extends Controller
{
	public function index(Request $request)
	{
		$count = Doctor::count();

		return response()->json([
			'doctor_count' => $count,
            'success' => true,
            'message' => 'Doctor count retrieved successfully',
		]);
	}
}
