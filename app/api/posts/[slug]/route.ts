import { NextRequest, NextResponse } from "next/server";
import { getPostBySlug, getPostContent } from "@/lib/notion";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        
        const post = await getPostBySlug(slug);
        if (!post) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        const content = await getPostContent(post.id);
        
        return NextResponse.json({
            ...post,
            content,
        });
    } catch (error) {
        console.error("Error fetching post:", error);
        return NextResponse.json(
            { error: "Failed to fetch post" },
            { status: 500 }
        );
    }
}