'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Topbar from '../components/topbar';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

const SECRET_PASSWORD = "admin123";

interface Package {
    id: string;
    title: string;
    description: string;
    image_url: string;
    category: string;
    duration: string;  // ✅ Naya field add kiya
    created_at: string;
}

export default function AdminPage() {
    // ================= AUTH STATES =================
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [inputPassword, setInputPassword] = useState('');
    const [authError, setAuthError] = useState('');
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    // ================= MAIN NAV STATES =================
    const [activeMainTab, setActiveMainTab] = useState<'packages' | 'services'>('packages');
    const [activeSubTab, setActiveSubTab] = useState<'umrah' | 'tour' | 'add'>('umrah');
    const [editingId, setEditingId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

    // ================= DATA STATES =================
    const [packages, setPackages] = useState<Package[]>([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'Umrah',
        duration: '15 Days',  // ✅ Default duration add kiya
        file: null as File | null,
        preview: ''
    });

    // ================ EFFECTS =================
    useEffect(() => {
        const status = localStorage.getItem('isAdminLoggedIn');
        if (status === 'true') setIsAuthenticated(true);
        setIsCheckingAuth(false);
    }, []);

    useEffect(() => {
        if (isAuthenticated) fetchPackages();
    }, [isAuthenticated]);

    // ================= HANDLERS =================
    const handleLogin = () => {
        if (inputPassword === SECRET_PASSWORD) {
            setIsAuthenticated(true);
            localStorage.setItem('isAdminLoggedIn', 'true');
            setAuthError('');
        } else {
            setAuthError('❌ Incorrect Password');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('isAdminLoggedIn');
        window.location.reload();
    };

    const fetchPackages = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/packages');
            const json = await res.json();
            if (json.success) setPackages(json.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) setFormData(prev => ({ ...prev, file, preview: URL.createObjectURL(file) }));
    };

    const handleEdit = (pkg: Package) => {
        setEditingId(pkg.id);
        setFormData({
            title: pkg.title,
            description: pkg.description || '',
            category: pkg.category || 'Umrah',
            duration: pkg.duration || '15 Days',  // ✅ Edit ke time duration load ho
            file: null,
            preview: pkg.image_url
        });
        setActiveSubTab('add');
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete permanently?')) return;
        try {
            const res = await fetch('/api/packages', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });
            const json = await res.json();
            if (json.success) {
                fetchPackages();
                alert('✅ Deleted successfully!');
            } else {
                alert('Error: ' + json.error);
            }
        } catch (err: any) {
            alert('Failed: ' + err.message);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title) return alert('Title required');
        setUploading(true);

        try {
            let imageUrl = formData.preview || '';

            if (formData.file) {
                const form = new FormData();
                form.append('file', formData.file);
                const uploadRes = await fetch('/api/packages/upload', { method: 'POST', body: form });
                const uploadJson = await uploadRes.json();
                if (!uploadJson.success) throw new Error(uploadJson.error);
                imageUrl = uploadJson.url;
            } else if (!editingId) {
                throw new Error('Please select an image');
            }

            const payload = {
                title: formData.title,
                description: formData.description,
                image_url: imageUrl,
                category: formData.category,
                duration: formData.duration  // ✅ Duration payload me add kiya
            };
            if (editingId) (payload as any).id = editingId;

            const res = await fetch('/api/packages', {
                method: editingId ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const result = await res.json();

            if (result.success) {
                fetchPackages();
                // ✅ Reset form me duration bhi add kiya
                setFormData({
                    title: '',
                    description: '',
                    category: 'Umrah',
                    duration: '15 Days',
                    file: null,
                    preview: ''
                });
                setEditingId(null);
                setActiveSubTab('umrah');
                alert(editingId ? '✅ Updated!' : '✅ Published!');
            } else {
                alert('Error: ' + result.error);
            }
        } catch (err: any) {
            alert('Error: ' + err.message);
        } finally {
            setUploading(false);
        }
    };

    const resetForm = () => {
        setEditingId(null);
        setFormData({
            title: '',
            description: '',
            category: 'Umrah',
            duration: '15 Days',  // ✅
            file: null,
            preview: ''
        });
    };

    // ================= FILTER LOGIC =================
    const filteredPackages = packages.filter(pkg => {
        if (activeSubTab === 'umrah') return pkg.category === 'Umrah';
        if (activeSubTab === 'tour') return pkg.category === 'Tour';
        return true;
    });

    // ================= AUTH SCREEN =================
    if (isCheckingAuth) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-10 h-10 border-4 border-[#0f88c0] border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#0A192F] flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl text-center">
                    <h2 className="text-3xl font-black text-[#0A192F] mb-2">Admin Access</h2>
                    <p className="text-gray-500 mb-6">Enter password to manage dashboard</p>
                    <input
                        type="password"
                        value={inputPassword}
                        onChange={(e) => setInputPassword(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg mb-4 focus:ring-2 focus:ring-[#0f88c0] outline-none text-center"
                        placeholder="••••••••"
                    />
                    {authError && <p className="text-red-500 text-sm mb-4 font-bold">{authError}</p>}
                    <button
                        onClick={handleLogin}
                        className="w-full py-3 bg-linear-to-r from-[#0f88c0] to-emerald-400 text-white rounded-lg font-bold hover:shadow-lg transition cursor-pointer"
                    >
                        Login
                    </button>
                </div>
            </div>
        );
    }

    // ================= MAIN DASHBOARD =================
    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">
            <Topbar />
            <Navbar />

            {/* HEADER */}
            <header className="bg-[#0A192F] text-white top-0 z-50 shadow-md">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-xl font-bold tracking-tight">Admin Dashboard</h1>
                        <p className="text-xs text-gray-400">Manage your travel platform</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition cursor-pointer"
                    >
                        Logout
                    </button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">

                {/* === SIDEBAR === */}
                <aside className="w-full lg:w-64 shrink-0 space-y-4">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2">
                        <button
                            onClick={() => setActiveMainTab('packages')}
                            className={`w-full px-4 py-3 rounded-lg text-left flex items-center gap-3 transition-all font-medium mb-1 ${activeMainTab === 'packages'
                                ? 'bg-[#0f88c0]/10 text-[#0f88c0] border border-[#0f88c0]/20 shadow-sm'
                                : 'text-gray-600 hover:bg-gray-50 cursor-pointer'
                                }`}
                        >
                            <span className="text-xl">📦</span>
                            <span>Packages</span>
                        </button>
                    </div>
                </aside>

                {/* === MAIN CONTENT === */}
                <section className="flex-1 min-w-0">

                    {activeMainTab === 'services' && (
                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-12 text-center">
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">🛠️</div>
                            <h2 className="text-2xl font-bold text-[#0A192F] mb-2">Services Management</h2>
                            <p className="text-gray-500">Yeh section abhi khali hai.</p>
                        </div>
                    )}

                    {activeMainTab === 'packages' && (
                        <div className="space-y-6">

                            {/* Sub-Tabs */}
                            <div className="flex items-center justify-between flex-wrap gap-3">
                                <div className="flex bg-white p-1.5 rounded-xl shadow-sm border border-gray-100">
                                    <button
                                        onClick={() => setActiveSubTab('umrah')}
                                        className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${activeSubTab === 'umrah'
                                            ? 'bg-[#0f88c0] text-white shadow-md'
                                            : 'text-gray-500 hover:bg-gray-50 cursor-pointer'
                                            }`}
                                    >
                                        🕋 Umrah Packages
                                    </button>
                                    <button
                                        onClick={() => setActiveSubTab('tour')}
                                        className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${activeSubTab === 'tour'
                                            ? 'bg-emerald-500 text-white shadow-md'
                                            : 'text-gray-500 hover:bg-gray-50 cursor-pointer'
                                            }`}
                                    >
                                        🌍 Tour Packages
                                    </button>
                                    <button
                                        onClick={() => { setActiveSubTab('add'); resetForm(); }}
                                        className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${activeSubTab === 'add'
                                            ? 'bg-gray-800 text-white shadow-md'
                                            : 'text-gray-500 hover:bg-gray-50 cursor-pointer'
                                            }`}
                                    >
                                        ➕ Add New
                                    </button>
                                </div>

                                {activeSubTab !== 'add' && (
                                    <div className="text-sm font-medium text-gray-500">
                                        {activeSubTab === 'umrah' ? 'Umrah' : 'Tour'}: {filteredPackages.length}
                                    </div>
                                )}
                            </div>

                            {/* List View */}
                            {activeSubTab !== 'add' && (
                                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                                    {loading ? (
                                        <div className="flex justify-center py-10">
                                            <div className="w-8 h-8 border-4 border-[#0f88c0] border-t-transparent rounded-full animate-spin"></div>
                                        </div>
                                    ) : filteredPackages.length === 0 ? (
                                        <div className="text-center py-16">
                                            <p className="text-gray-400 text-lg">
                                                No {activeSubTab === 'umrah' ? 'Umrah' : 'Tour'} packages found.
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-6">
                                            {filteredPackages.map(pkg => (
                                                <div key={pkg.id} className="border rounded-xl overflow-hidden hover:shadow-md transition bg-white group">
                                                    <div className="relative h-40 bg-gray-100">
                                                        <Image src={pkg.image_url} alt={pkg.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                                                        {/* ✅ Duration Badge */}
                                                        {pkg.category === 'Umrah' && pkg.duration && (
                                                            <span className="absolute top-2 right-2 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-md text-xs font-bold text-[#0A192F] shadow">
                                                                🕋 {pkg.duration}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="p-4">
                                                        <h3 className="font-bold text-[#0A192F] truncate">{pkg.title}</h3>
                                                        <p className="text-xs text-gray-500 line-clamp-1 mt-1 mb-3">{pkg.description}</p>
                                                        <div className="flex gap-2">
                                                            <button onClick={() => handleEdit(pkg)} className="flex-1 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-100 cursor-pointer">Edit</button>
                                                            <button onClick={() => handleDelete(pkg.id)} className="flex-1 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-bold hover:bg-red-100 cursor-pointer">Delete</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Add/Edit Form */}
                            {activeSubTab === 'add' && (
                                <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden p-6">
                                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                                        <h3 className="text-xl font-bold text-[#0A192F]">
                                            {editingId ? '✏️ Edit Package' : '➕ Add New Package'}
                                        </h3>
                                        {editingId && (
                                            <button type="button" onClick={() => { resetForm(); setActiveSubTab('umrah'); }} className="text-sm text-red-500 hover:text-red-700 font-bold cursor-pointer">
                                                Cancel Edit
                                            </button>
                                        )}
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-5 mb-5">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-600 uppercase mb-1.5">Package Title *</label>
                                            <input
                                                required
                                                type="text"
                                                value={formData.title}
                                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0f88c0] outline-none text-sm"
                                                placeholder="e.g., Premium Umrah 15 Days"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-600 uppercase mb-1.5">Category *</label>
                                            <select
                                                value={formData.category}
                                                onChange={e => setFormData({
                                                    ...formData,
                                                    category: e.target.value,
                                                    // Category change hone par duration reset
                                                    duration: e.target.value === 'Umrah' ? '15 Days' : ''
                                                })}
                                                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0f88c0] outline-none text-sm bg-white"
                                            >
                                                <option value="Umrah">🕋 Umrah Packages</option>
                                                <option value="Tour">🌍 Tour Packages</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* ✅ NEW: Duration Dropdown - Sirf Umrah category ke liye */}
                                    {formData.category === 'Umrah' && (
                                        <div className="mb-5">
                                            <label className="block text-xs font-bold text-gray-600 uppercase mb-1.5">
                                                Duration *
                                            </label>
                                            <select
                                                value={formData.duration}
                                                onChange={e => setFormData({ ...formData, duration: e.target.value })}
                                                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0f88c0] outline-none text-sm bg-white"
                                            >
                                                <option value="15 Days">🕋 15 Days Umrah</option>
                                                <option value="21 Days">🕋 21 Days Umrah</option>
                                            </select>
                                            <p className="text-xs text-gray-400 mt-1.5">
                                                Client public page par 15 Days ya 21 Days ke filter se dekh payega
                                            </p>
                                        </div>
                                    )}

                                    <div className="mb-5">
                                        <label className="block text-xs font-bold text-gray-600 uppercase mb-1.5">Description</label>
                                        <textarea
                                            value={formData.description}
                                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                                            rows={3}
                                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0f88c0] outline-none text-sm resize-none"
                                            placeholder="One line description..."
                                        />
                                    </div>

                                    <div className="mb-6">
                                        <label className="block text-xs font-bold text-gray-600 uppercase mb-1.5">Package Image</label>
                                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 flex items-center gap-4 hover:border-[#0f88c0] transition cursor-pointer bg-gray-50">
                                            {formData.preview ? (
                                                <div className="relative w-24 h-24 shrink-0 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                                                    <Image src={formData.preview} alt="Preview" fill className="object-cover" />
                                                </div>
                                            ) : (
                                                <div className="w-24 h-24 shrink-0 rounded-lg bg-gray-200 flex items-center justify-center text-gray-400">
                                                    <span className="text-2xl">📷</span>
                                                </div>
                                            )}
                                            <div className="flex-1">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleFileChange}
                                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-[#0f88c0] hover:file:bg-blue-100 cursor-pointer"
                                                />
                                                <p className="text-xs text-gray-400 mt-1">
                                                    {formData.file ? 'Ready: ' + formData.file.name : 'Click to upload or drag file here'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                                        <button
                                            type="button"
                                            onClick={() => { resetForm(); setActiveSubTab('umrah'); }}
                                            className="px-6 py-2.5 border border-gray-200 text-gray-600 font-medium rounded-xl hover:bg-gray-50 transition cursor-pointer"
                                        >
                                            Discard
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={uploading}
                                            className="px-8 py-2.5 bg-linear-to-r from-[#0f88c0] to-emerald-400 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50 cursor-pointer"
                                        >
                                            {uploading ? 'Uploading...' : (editingId ? 'Update Package' : 'Publish Package')}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    )}
                </section>
            </main>
            <Footer />
        </div>
    );
}