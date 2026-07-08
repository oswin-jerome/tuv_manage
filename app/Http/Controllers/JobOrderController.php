<?php

namespace App\Http\Controllers;

use App\Models\Certificate;
use App\Models\Company;
use App\Models\JobOrder;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class JobOrderController extends Controller
{
    public function index(Request $request)
    {
        $query = JobOrder::with(['company', 'creator', 'assignedTo']);

        if ($request->filled('department')) {
            $query->where('department', 'like', '%' . $request->get('department') . '%');
        }

        if ($request->filled('job_order_type')) {
            $query->where('job_order_type', $request->get('job_order_type'));
        }

        if ($request->filled('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->whereHas('company', fn($cq) => $cq->where('name', 'like', '%' . $search . '%'))
                  ->orWhere('job_request_number', 'like', '%' . $search . '%');
            });
        }

        $paginate = $query->orderBy('id', 'desc')->paginate(15)->withQueryString();

        return Inertia::render('JobOrders/Index', [
            'paginate' => $paginate,
            'request' => $request->only(['search', 'job_order_type', 'department']),
        ]);
    }

    public function create()
    {
        return Inertia::render('JobOrders/Create', [
            'companies' => Company::orderBy('name')->get(['id', 'name']),
            'users' => User::orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'department' => 'required|string',
            'job_order_type' => 'required|string',
            'company_id' => 'required|exists:companies,id',
            'assigned_to_id' => 'nullable|exists:users,id',
            'job_request_number' => 'nullable|string',
            'location' => 'nullable|string',
            'date_from' => 'nullable|date',
            'date_to' => 'nullable|date',
            'status' => 'nullable|in:active,completed,draft',
        ]);

        $validated['creator_id'] = Auth::id();

        JobOrder::create($validated);

        return redirect()->route('job-orders.index')->with('success', 'Job Order Added Successfully');
    }

    public function show(JobOrder $jobOrder)
    {
        $jobOrder->load(['company', 'creator', 'assignedTo', 'certificates.certificateType']);

        return Inertia::render('JobOrders/Show', [
            'jobOrder' => $jobOrder,
        ]);
    }

    public function edit(JobOrder $jobOrder)
    {
        $jobOrder->load(['company', 'assignedTo']);
        return Inertia::render('JobOrders/Edit', [
            'jobOrder' => $jobOrder,
            'companies' => Company::orderBy('name')->get(['id', 'name']),
            'users' => User::orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function update(Request $request, JobOrder $jobOrder)
    {
        $validated = $request->validate([
            'department' => 'required|string',
            'job_order_type' => 'required|string',
            'company_id' => 'required|exists:companies,id',
            'assigned_to_id' => 'nullable|exists:users,id',
            'job_request_number' => 'nullable|string',
            'location' => 'nullable|string',
            'date_from' => 'nullable|date',
            'date_to' => 'nullable|date',
            'status' => 'nullable|in:active,completed,draft',
        ]);

        $jobOrder->update($validated);

        return redirect()->route('job-orders.show', $jobOrder);
    }

    public function destroy(JobOrder $jobOrder)
    {
        $jobOrder->delete();

        return redirect()->route('job-orders.index');
    }

    public function clone(JobOrder $jobOrder)
    {
        $clone = $jobOrder->replicate(['deleted_at']);
        $clone->creator_id = Auth::id();
        $clone->status = 'draft';
        $clone->save();

        return redirect()->route('job-orders.edit', $clone);
    }

    public function attachCertificate(JobOrder $jobOrder, Request $request)
    {
        $request->validate([
            'ref_no' => 'required|string',
        ]);

        $certificate = Certificate::where('ref_no', $request->get('ref_no'))->firstOrFail();
        $certificate->job_order_id = $jobOrder->id;
        $certificate->save();

        return back();
    }
}
