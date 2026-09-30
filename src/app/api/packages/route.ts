import { NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';

// Helper: URL se file path nikalne ke liye
const getFilePathFromUrl = (url: string): string | null => {
    if (!url) return null;
    try {
        const match = url.match(/\/storage\/v1\/object\/public\/package-images\/(.+)/);
        return match ? match[1] : null;
    } catch {
        return null;
    }
};

// ================= GET =================
export async function GET() {
    try {
        const { data, error } = await supabase
            .from('packages')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return NextResponse.json({ success: true, data: data || [] });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// ================= POST =================
export async function POST(req: Request) {
    try {
        // ✅ duration bhi le liya request me se
        const { title, description, image_url, category, duration } = await req.json();

        if (!title || !image_url) {
            return NextResponse.json({ success: false, error: 'Title & Image required' }, { status: 400 });
        }

        const { data, error } = await supabase
            .from('packages')
            .insert([{
                title,
                description,
                image_url,
                category: category || 'Umrah',
                duration: duration || '15 Days'  // ✅ Duration save ho raha hai
            }])
            .select()
            .single();

        if (error) throw error;
        return NextResponse.json({ success: true, data }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// ================= PUT (Edit + Storage Cleanup) =================
export async function PUT(req: Request) {
    try {
        // ✅ duration bhi le liya
        const { id, title, description, image_url, category, duration } = await req.json();

        if (!id) return NextResponse.json({ success: false, error: 'ID required' }, { status: 400 });

        // 1️⃣ Pehle purana package fetch karein
        const { data: oldPkg, error: fetchErr } = await supabase
            .from('packages')
            .select('image_url')
            .eq('id', id)
            .single();

        if (fetchErr && fetchErr.code !== 'PGRST116') throw fetchErr;

        // 2️⃣ Agar image change hui hai, to purani delete karein
        if (oldPkg?.image_url && image_url && oldPkg.image_url !== image_url) {
            const oldPath = getFilePathFromUrl(oldPkg.image_url);
            if (oldPath) {
                await supabase.storage.from('package-images').remove([oldPath]);
            }
        }

        // 3️⃣ Database update karein - ✅ duration bhi update ho raha hai
        const { data, error } = await supabase
            .from('packages')
            .update({
                title,
                description,
                image_url,
                category,
                duration: duration || '15 Days'  // ✅
            })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return NextResponse.json({ success: true, data });

    } catch (error: any) {
        console.error('❌ PUT Error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// ================= DELETE =================
export async function DELETE(req: Request) {
    try {
        const { id } = await req.json();
        if (!id) return NextResponse.json({ success: false, error: 'ID required' }, { status: 400 });

        const { data: pkg, error: fetchErr } = await supabase
            .from('packages')
            .select('image_url')
            .eq('id', id)
            .single();

        if (fetchErr && fetchErr.code !== 'PGRST116') throw fetchErr;

        if (pkg?.image_url) {
            const filePath = getFilePathFromUrl(pkg.image_url);
            if (filePath) {
                await supabase.storage.from('package-images').remove([filePath]);
            }
        }

        const { error } = await supabase.from('packages').delete().eq('id', id);
        if (error) throw error;

        return NextResponse.json({ success: true, message: 'Deleted successfully' });

    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}