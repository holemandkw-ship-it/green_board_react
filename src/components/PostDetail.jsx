import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function PostDetail({ token }) {
    const { postId } = useParams();

    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [postMessage, setPostMessage] = useState("");
    const [commentMessage, setCommentMessage] = useState("");

    useEffect(() => {
        if (!Number.isInteger(Number(postId)) || Number(postId) < 1) {
            console.log("잘못된 게시글 번호입니다.");
            return;
        }

        // setPost(null);

        async function loadDetail() {
            // 게시글 상세 조회
            try {
                const response = await fetch(
                    `http://127.0.0.1:8080/api/board/${postId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const result = await response.json();

                if (!response.ok || !result.success) {
                    throw new Error(
                        result.message || "게시글을 불러올 수 없습니다."
                    );
                }

                setPost(result.data);
                setPostMessage("");

            } catch (error) {
                setPostMessage(error.message);
                return;
            }

            // 댓글 목록 조회
            try {
                const response = await fetch(
                    `http://127.0.0.1:8080/api/board/${postId}/comments`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const result = await response.json();

                if (!response.ok || !result.success) {
                    throw new Error(
                        result.message || "댓글을 불러올 수 없습니다."
                    );
                }

                setComments(result.data);
                setCommentMessage("");

            } catch (error) {
                setCommentMessage(error.message);
            }
        }

        loadDetail();

    }, [postId, token]);

    return (
        <main>
            <article>
                <h1 id="post-title">
                    {post?.title || "게시글을 불러올 수 없습니다"}
                </h1>

                <p id="post-meta" className="meta">
                    {post && `${post.authorNickname} | ${post.createdDatetime || ""}`}
                </p>

                <p id="post-content">{post?.content}</p>

                <p id="post-message" role="status">
                    {postMessage}
                </p>
            </article>

            <Link to="/posts">목록으로</Link>

            {post && (
                <section
                    id="comments-section"
                    aria-labelledby="comments-title"
                >
                    <h2 id="comments-title">댓글</h2>

                    <p id="comments-message" role="status">
                        {commentMessage}
                    </p>

                    <ul id="comment-list">
                        {comments.length === 0 ? (
                            <li>등록된 댓글이 없습니다.</li>
                        ) : (
                            comments.map((comment) => (
                                <li key={comment.id}>
                                    <strong>{comment.nickname}</strong>
                                    <p>{comment.content}</p>
                                </li>
                            ))
                        )}
                    </ul>

                    <form id="comment-form">
                        <label htmlFor="comment-content">
                            댓글 내용
                        </label>

                        <textarea
                            id="comment-content"
                            name="content"
                            required
                            maxLength="255"
                        ></textarea>

                        <button type="submit">
                            댓글 등록
                        </button>
                    </form>
                </section>
            )}
        </main>
    );
}