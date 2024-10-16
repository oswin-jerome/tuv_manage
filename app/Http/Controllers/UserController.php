<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        Gate::authorize('viewAny', User::class);
        $users = User::with("roles")->get();
        return Inertia::render("Users/Index", [
            "users" => $users
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        Gate::authorize('create', User::class);
        $roles =  Role::all();
        return Inertia::render("Users/Create", [
            "roles" => $roles
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'phone' => 'required|numeric|unique:' . User::class,
            'password' => ['required', 'min:8'],
            "roles" => "required|array"
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => Hash::make($request->password),
        ]);

        $user->assignRole($request->roles);

        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        $roles =  Role::all();
        $user = User::with("roles")->where("id", $user->id)->firstOrFail();
        return Inertia::render("Users/Show", [
            "user" => $user,
            "roles" => $roles,
            "certificates" => $user->myCertificates
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        $roles =  Role::all();
        $user = User::with("roles")->where("id", $user->id)->firstOrFail();
        return Inertia::render("Users/Edit", [
            "user" => $user,
            "roles" => $roles
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $data =   $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:users,email,' . $user->id,
            'phone' => 'required|numeric|unique:users,phone,' . $user->id,
            'password' => ['nullable', 'min:8'],
            "roles" => "required|array"
        ]);
        unset($data['password']);
        $user->update($data);
        if ($request->has("password")) {
            $user->password = Hash::make($request->get("password"));
            $user->save();
        }
        $user->syncRoles($request->roles);

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}
