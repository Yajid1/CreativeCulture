<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class RoleController extends Controller
{
    /**
     * Display a listing of the roles.
     */
    public function index(): Response
    {
        $roles = Role::orderBy('id', 'asc')->get()->map(function (Role $role) {
            return [
                'id' => $role->id,
                'name' => $role->name,
                'email' => $role->email ?? '',
                'description' => $role->description ?? '',
                'status' => $role->status,
                'environment' => $role->environment,
                'permissions' => $role->permissions ?? 'Full Access',
                'lastUpdated' => $role->updated_at ? $role->updated_at->format('m/d/Y') : now()->format('m/d/Y'),
            ];
        });

        return Inertia::render('admin/roles-admin', [
            'roles' => $roles,
        ]);
    }

    /**
     * Store a newly created role in database.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'description' => ['nullable', 'string'],
            'status' => ['required', 'in:Online,Offline'],
            'environment' => ['required', 'in:Production,Staging,Development'],
            'permissions' => ['nullable', 'string'],
        ]);

        $role = Role::create($validated);

        // Also create user account if email is provided
        if (! empty($validated['email'])) {
            User::updateOrCreate(
                ['email' => $validated['email']],
                [
                    'name' => $validated['name'],
                    'password' => Hash::make('admin123'),
                    'email_verified_at' => now(),
                ]
            );
        }

        return redirect()->back()->with('success', 'Admin Role berhasil ditambahkan.');
    }

    /**
     * Update the specified role in database.
     */
    public function update(Request $request, Role $role): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'description' => ['nullable', 'string'],
            'status' => ['required', 'in:Online,Offline'],
            'environment' => ['required', 'in:Production,Staging,Development'],
            'permissions' => ['nullable', 'string'],
        ]);

        $oldEmail = $role->email;
        $role->update($validated);

        // Update corresponding user
        if (! empty($oldEmail)) {
            User::where('email', $oldEmail)->update([
                'name' => $validated['name'],
                'email' => $validated['email'],
            ]);
        }

        return redirect()->back()->with('success', 'Admin Role berhasil diperbarui.');
    }

    /**
     * Toggle the status of a role (Online / Offline).
     */
    public function toggleStatus(Role $role): RedirectResponse
    {
        $newStatus = $role->status === 'Online' ? 'Offline' : 'Online';
        $role->update(['status' => $newStatus]);

        return redirect()->back()->with('success', "Status role {$role->name} berhasil diubah menjadi {$newStatus}.");
    }

    /**
     * Remove the specified role from database.
     */
    public function destroy(Role $role): RedirectResponse
    {
        $email = $role->email;
        $name = $role->name;

        $role->delete();

        if (! empty($email)) {
            User::where('email', $email)->delete();
        }

        return redirect()->back()->with('success', "Admin Role {$name} berhasil dihapus.");
    }
}
