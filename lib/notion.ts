import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

const notion = new Client({
    auth: process.env.NOTION_API_KEY || process.env.NOTION_TOKEN,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

export const getPublishedPosts = async () => {
    const databaseId = process.env.NOTION_DATABASE_ID;
    if (!databaseId) throw new Error("Missing NOTION_DATABASE_ID");

    const response = await notion.databases.query({
        database_id: databaseId,
        // Removed filter to avoid errors with incorrect property types (e.g. Published being Text instead of Checkbox)
        // filter: {
        //     property: "Published",
        //     checkbox: {
        //         equals: true,
        //     },
        // },
        sorts: [
            {
                timestamp: "created_time",
                direction: "descending",
            },
        ],
    });

    return response.results.map((page: any) => {
        // Helper to get title safely
        const title =
            page.properties.Name?.title?.[0]?.plain_text || "Untitled";

        // Helper to get slug
        const slug =
            page.properties.Slug?.rich_text?.[0]?.plain_text || page.id;

        // Helper to get tags (Handle both Multi-select and Rich Text)
        let tags: string[] = [];
        if (page.properties.Tags?.multi_select) {
            tags = page.properties.Tags.multi_select.map((tag: any) => tag.name);
        } else if (page.properties.Tags?.rich_text) {
            const text = page.properties.Tags.rich_text[0]?.plain_text;
            if (text) tags = [text];
        }

        // Helper to get date (Use created_time consistently if Date prop is missing)
        const date =
            page.properties.Date?.date?.start || page.created_time;

        return {
            id: page.id,
            title,
            slug,
            tags,
            date,
            cover: page.cover?.external?.url || page.cover?.file?.url || null,
        };
    });
};

export const getPostBySlug = async (slug: string) => {
    const databaseId = process.env.NOTION_DATABASE_ID;
    if (!databaseId) throw new Error("Missing NOTION_DATABASE_ID");

    const response = await notion.databases.query({
        database_id: databaseId,
        filter: {
            property: "Slug",
            rich_text: {
                equals: slug,
            },
        },
    });

    const page = response.results[0];
    if (!page) return null;

    const title = (page as any).properties.Name?.title?.[0]?.plain_text || "Untitled";
    const date = (page as any).properties.Date?.date?.start || (page as any).created_time;

    let tags: string[] = [];
    if ((page as any).properties.Tags?.multi_select) {
        tags = (page as any).properties.Tags.multi_select.map((tag: any) => tag.name);
    } else if ((page as any).properties.Tags?.rich_text) {
        const text = (page as any).properties.Tags.rich_text[0]?.plain_text;
        if (text) tags = [text];
    }

    return {
        id: page.id,
        title,
        date,
        tags,
        cover: (page as any).cover?.external?.url || (page as any).cover?.file?.url || null,
    };
};

export const getPostContent = async (pageId: string) => {
    const mdblocks = await n2m.pageToMarkdown(pageId);
    const mdString = n2m.toMarkdownString(mdblocks);
    return mdString.parent;
};
