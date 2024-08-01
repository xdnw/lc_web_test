import { markup } from '@/utils/Markup';
import DOMPurify from 'dompurify';

export default function MarkupRenderer({content}: {content: string}) {
    const sanitizedContent = DOMPurify.sanitize(markup(content));

    return (
        <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
    );
}