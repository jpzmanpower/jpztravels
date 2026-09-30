import { NextResponse } from 'next/server';
import { supabase } from '../../../../../lib/supabase';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File | null;

        if (!file) return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 });
        if (!file.type.startsWith('image/')) return NextResponse.json({ success: false, error: 'Only images allowed' }, { status: 400 });

        const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
        const { data, error } = await supabase.storage
            .from('package-images')
            .upload(fileName, file, { contentType: file.type, cacheControl: '3600' });

        if (error) throw error;

        const { data: { publicUrl } } = supabase.storage.from('package-images').getPublicUrl(data.path);
        return NextResponse.json({ success: true, url: publicUrl });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}