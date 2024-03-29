import { Link, routes } from '@redwoodjs/router'

import type { Post } from 'types/graphql'

const truncate = (text: string, length: number) => {
    return text.substring(0, length) + '...'
}

interface Props {
    article: Omit<Post, 'createdAt'>
    summary?: boolean
}

const Article = ({ article, summary = false }: Props) => {
    return (
        <article className="mt-10">
            <header>
                <h2 className="text-xl font-semibold text-blue-700">
                    <Link to={routes.article({ id: article.id })}>
                        {article.title}
                    </Link>
                </h2>
            </header>
            <div className="mt-2 font-light text-gray-900">
                {summary ? truncate(article.body, 100) : article.body}
            </div>
        </article>
    )
}

export default Article
