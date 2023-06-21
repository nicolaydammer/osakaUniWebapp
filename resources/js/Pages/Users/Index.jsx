import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm} from "@inertiajs/react";
import React from "react";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Index({ auth, users }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Users" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-4">
                    <div className='bg-white overflow-hidden shadow-sm sm:rounded-lg'>
                        <StoreUserForm/>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-300">
                                        <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                Name
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Email
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Generated password
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                        {users.map((user) => (
                                            <tr key={user.email}>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                    {user.name}
                                                </td>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                    {user.email}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{user.generated_password}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

function StoreUserForm() {
    const { data, setData, post, reset, processing } = useForm({
        email: '',
        name: '',
    })

    const handleSubmit = e => {
        e.preventDefault()

        post(route('users.store'), {
            onFinish: () => reset(),
        })
    }

    return (
        <form
            className='flex p-4 space-x-4'
            onSubmit={handleSubmit}>
            <TextInput
                value={data.email}
                onChange={({ target }) => setData('email', target.value)}
                placeholder='Email'/>

            <TextInput
                value={data.name}
                onChange={({ target }) => setData('name', target.value)}
                placeholder='Name'/>

            <PrimaryButton disabled={processing}>
                Verstuur
            </PrimaryButton>
        </form>
    )
}
