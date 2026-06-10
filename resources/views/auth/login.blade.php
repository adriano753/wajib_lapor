<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - WLKP</title>

    @vite(['resources/css/login.css'])
</head>

<body>

<div class="login-wrapper flex min-h-screen w-full">
        <!-- Kiri -->
        <div class="login-left hidden md:flex flex-col justify-center items-center w-1/2 bg-cover bg-[position:80%_center] relative text-white"
            style="background-image: url('{{ asset('images/gedung_kemnaker.jpg') }}');">
            <div class="overlay"></div>
            <div class="relative z-10 text-center px-10">
                <img src="{{ asset('images/logo_kemnaker.png') }}" alt="Logo Kemnaker" class="mx-auto w-50 mb-4">
                <h1 class="text-3xl font-bold mb-3">Kementerian Ketenagakerjaan RI</h1>
                <p class="text-lg font-light">Wajib Lapor Ketenagakerjaan Perusahaan</p>
            </div>
        </div>

    <!-- Kanan -->
    <div class="login-right flex justify-center items-center w-full md:w-1/2 p-6 sm:p-10 bg-white">
            <div class="login-card">
                <div class="text-center mb-6">
                    <img src="{{ asset('images/kemnaker_logo.png') }}" alt="Logo" class="mx-auto w-16 mb-3">
                    <h2 class="text-xl font-semibold text-gray-800">Wajib Lapor Ketenagakerjaan Perusahaan</h2>
                    <p class="text-sm text-gray-600">Kementerian Ketenagakerjaan RI</p>
                </div>

            {{-- Session Status --}}
            @if(session('status'))
                <div class="mb-4 text-sm text-green-600">
                    {{ session('status') }}
                </div>
            @endif

            {{-- Validation Errors --}}
            @if($errors->any())
                <div class="mb-4 text-sm text-red-600">
                    <ul>
                        @foreach ($errors->all() as $error)
                            <li>• {{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif

            <form method="POST" action="{{ route('login') }}">
                @csrf

                <!-- Email -->
                <div class="mb-4">
                    <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                    <input id="email"
                           name="email"
                           type="email"
                           value="{{ old('email') }}"
                           required
                           autofocus
                           class="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" style="height: 40px;">
                </div>

                <!-- Password -->
                <div class="mb-4">
                    <label for="password" class="block text-sm font-medium text-gray-700">Kata Sandi</label>
                    <div class="relative">
                        <input id="password"
                               name="password"
                               type="password"
                               required
                               class="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" style="height: 40px;">
                        <button type="button"
                                onclick="togglePassword()"
                                class="absolute inset-y-0 right-3 flex items-center">
                             👁
                        </button>
                    </div>
                </div>

                <!-- Remember Me & Forgot -->
                  <div class="flex items-center justify-between mb-4">
                        <label class="flex items-center">
                            <input type="checkbox" name="remember"
                                class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                            <span class="ml-2 text-sm text-gray-600">Ingat saya</span>
                        </label>
                        @if (Route::has('password.request'))
                            <a href="{{ route('password.request') }}" class="text-sm text-blue-600 hover:underline">
                                Lupa password?
                            </a>
                        @endif
                    </div>

                

                <!-- Login Button -->
                <button type="submit" class="login-btn">
                    Masuk
                </button>
            </form>

        </div>
    </div>
</div>

<script>
    function togglePassword() {
        const password = document.getElementById('password');
        password.type = password.type === 'password' ? 'text' : 'password';
    }
</script>

<script src="https://www.google.com/recaptcha/api.js" async defer></script>

</body>
</html>