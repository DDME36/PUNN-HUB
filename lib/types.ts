// Shared types for the application

export interface Post {
  id: string;
  title: string;
  slug: string;
  tags: string[];
  date: string;
  cover: string | null;
  content?: string;
}

export interface NotionPage {
  id: string;
  properties: {
    Name: {
      title: Array<{
        plain_text: string;
      }>;
    };
    Slug: {
      rich_text: Array<{
        plain_text: string;
      }>;
    };
    Tags: {
      multi_select: Array<{
        name: string;
      }>;
    };
    Date: {
      date: {
        start: string;
      } | null;
    };
    Published: {
      checkbox: boolean;
    };
  };
  cover: {
    type: string;
    external?: {
      url: string;
    };
    file?: {
      url: string;
    };
  } | null;
}
