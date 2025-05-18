
        document.addEventListener('DOMContentLoaded', function() {
            // Interacción para los botones "Me gusta"
            const likeButtons = document.querySelectorAll('.post-action:first-child');
            likeButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const text = this.textContent.trim();
                    const likeCount = parseInt(text.match(/\d+/)[0]);
                    
                    if (this.classList.contains('liked')) {
                        this.innerHTML = `<i class="fas fa-thumbs-up"></i> Me gusta (${likeCount - 1})`;
                        this.classList.remove('liked');
                        this.style.color = '';
                    } else {
                        this.innerHTML = `<i class="fas fa-thumbs-up"></i> Me gusta (${likeCount + 1})`;
                        this.classList.add('liked');
                        this.style.color = '#ff6b6b';
                    }
                });
            });
            
            // Interacción para publicar comentarios
            const commentInputs = document.querySelectorAll('.add-comment input');
            commentInputs.forEach(input => {
                input.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter' && this.value.trim() !== '') {
                        const commentsSection = this.closest('.comments-section');
                        const newComment = document.createElement('div');
                        newComment.className = 'comment';
                        newComment.innerHTML = `
                            <img src="/api/placeholder/40/40" alt="Tu foto de perfil" class="profile-pic" style="width: 40px; height: 40px;">
                            <div class="comment-content">
                                <div class="comment-writer">Tú</div>
                                <p>${this.value}</p>
                            </div>
                        `;
                        
                        commentsSection.insertBefore(newComment, this.parentElement);
                        
                        // Actualizar contador de comentarios
                        const commentAction = this.closest('.post').querySelector('.post-action:nth-child(2)');
                        const commentCount = parseInt(commentAction.textContent.match(/\d+/)[0]);
                        commentAction.innerHTML = `<i class="fas fa-comment"></i> Comentar (${commentCount + 1})`;
                        
                        this.value = '';
                    }
                });
            });
            
            // Interacción para el botón de publicar
            const postButton = document.querySelector('.create-post-actions .btn');
            const postInput = document.querySelector('.create-post-input');
            
            postButton.addEventListener('click', function() {
                if (postInput.value.trim() !== '') {
                    const postsContainer = document.querySelector('.posts-container');
                    const newPost = document.createElement('article');
                    newPost.className = 'post';
                    newPost.innerHTML = `
                        <div class="post-header">
                            <img src="/api/placeholder/50/50" alt="Tu foto de perfil" class="profile-pic">
                            <div class="post-info">
                                <h4>Tú</h4>
                                <p>Justo ahora · <i class="fas fa-globe-americas"></i></p>
                            </div>
                        </div>
                        <div class="post-content">
                            <p>${postInput.value}</p>
                        </div>
                        <div class="post-actions">
                            <div class="post-action">
                                <i class="fas fa-thumbs-up"></i> Me gusta (0)
                            </div>
                            <div class="post-action">
                                <i class="fas fa-comment"></i> Comentar (0)
                            </div>
                            <div class="post-action">
                                <i class="fas fa-share"></i> Compartir
                            </div>
                        </div>
                        <div class="comments-section">
                            <div class="add-comment">
                                <img src="/api/placeholder/40/40" alt="Tu foto de perfil" class="profile-pic" style="width: 40px; height: 40px;">
                                <input type="text" placeholder="Escribe un comentario...">
                            </div>
                        </div>
                    `;
                    
                    // Insertar después del área de crear publicación
                    postsContainer.insertBefore(newPost, document.querySelector('.create-post').nextSibling);
                    
                    // Reiniciar el formulario
                    postInput.value = '';
                    
                    // Añadir la misma funcionalidad a los nuevos elementos
                    const newLikeButton = newPost.querySelector('.post-action:first-child');
                    newLikeButton.addEventListener('click', function() {
                        const text = this.textContent.trim();
                        const likeCount = parseInt(text.match(/\d+/)[0]);
                        
                        if (this.classList.contains('liked')) {
                            this.innerHTML = `<i class="fas fa-thumbs-up"></i> Me gusta (${likeCount - 1})`;
                            this.classList.remove('liked');
                            this.style.color = '';
                        } else {
                            this.innerHTML = `<i class="fas fa-thumbs-up"></i> Me gusta (${likeCount + 1})`;
                            this.classList.add('liked');
                            this.style.color = '#ff6b6b';
                        }
                    });
                    
                    const newCommentInput = newPost.querySelector('.add-comment input');
                    newCommentInput.addEventListener('keypress', function(e) {
                        if (e.key === 'Enter' && this.value.trim() !== '') {
                            const commentsSection = this.closest('.comments-section');
                            const newComment = document.createElement('div');
                            newComment.className = 'comment';
                            newComment.innerHTML = `
                                <img src="/api/placeholder/40/40" alt="Tu foto de perfil" class="profile-pic" style="width: 40px; height: 40px;">
                                <div class="comment-content">
                                    <div class="comment-writer">Tú</div>
                                    <p>${this.value}</p>
                                </div>
                            `;
                            
                            commentsSection.insertBefore(newComment, this.parentElement);
                            
                            // Actualizar contador de comentarios
                            const commentAction = this.closest('.post').querySelector('.post-action:nth-child(2)');
                            const commentCount = parseInt(commentAction.textContent.match(/\d+/)[0]);
                            commentAction.innerHTML = `<i class="fas fa-comment"></i> Comentar (${commentCount + 1})`;
                            
                            this.value = '';
                        }
                    });
                }
            });
        });
