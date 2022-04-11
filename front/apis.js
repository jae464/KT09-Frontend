// 유저 정보 불러오기
function getUser(userId) {
	var result;
	$.ajax({
		type: 'get',
		url: `http://localhost:3000/users/${userId}`,
		contentType: 'application/json',
		async: false,
		success: function (data) {
			result = data;
			console.log('user:', result);
		},
		error: function () {
			alert('유저 정보 로드 실패');
		},
	});
	return result;
}
// 게시글 추가
function addPost(data) {
	$.ajax({
		type: 'post',
		url: 'http://localhost:3000/posts',
		contentType: 'application/json',
		traditional: true,
		data: JSON.stringify(data),
		async: false,
		success: function (data) {
			console.log('업로드 성공');
			// alert('업로드 성공');
		},
	});
}
// 모든 게시글 불러오기
function getAllPosts(category) {
	var result;
	var getUrl = category
		? `http://localhost:3000/posts?category=${category}`
		: 'http://localhost:3000/posts';
	console.log(category);
	$.ajax({
		type: 'get',
		url: getUrl,
		contentType: 'application/json',
		async: false,
		success: function (data) {
			result = data;
			console.log('posts:', result);
		},
		error: function () {
			alert('실패');
		},
	});
	return result;
}

// 게시글 삭제
function deletePost(postId) {
	$.ajax({
		type: 'delete',
		url: `http://localhost:3000/posts/${postId}`,
		async: false,
		success: function (data) {
			console.log('삭제:', data);
		},
		error: function () {
			alert('게시글 삭제 실패');
		},
	});
}
// 게시글 정보 불러오기
function getPost(postId) {
	var result;
	$.ajax({
		type: 'get',
		url: `http://localhost:3000/posts/${postId}`,
		contentType: 'application/json',
		async: false,
		success: function (data) {
			result = data;
			console.log('post:', result);
		},
		error: function () {
			alert('실패');
		},
	});
	return result;
}

// 댓글 리스트 불러오기
function getComments(postId) {
	var comments;
	$.ajax({
		type: 'get',
		url: `http://localhost:3000/comments?postId=${postId}`,
		contentType: 'application/json',
		async: false,
		success: function (data) {
			comments = data;
			console.log('comments:', data);
		},
		error: function () {
			alert('댓글 로드 실패');
		},
	});
	return comments;
}

// 댓글 업로드
function postComment(data) {
	$.ajax({
		type: 'post',
		url: `http://localhost:3000/comments?postId=${data.postId}`,
		contentType: 'application/json',
		data: JSON.stringify(data),
		async: false,
		success: function (data) {
			console.log('업로드 성공');
		},
		error: function () {
			alert('댓글 업로드 실패');
		},
	});
}

// 게시글 좋아요 추가
function addLike(postId, like) {
	var data = { like: like };
	$.ajax({
		type: 'patch',
		url: `http://localhost:3000/posts/${postId}`,
		contentType: 'application/json',
		data: JSON.stringify(data),
		async: false,
		success: function (data) {
			console.log('좋아요 업데이트 성공');
		},
		error: function () {
			alert('좋아요 업데이트 실패');
		},
	});
}

// 해결 완료로 바꾸기
function addSolved(postId) {
	$.ajax({
		type: 'patch',
		url: `http://localhost:3000/posts/${postId}`,
		contentType: 'application/json',
		data: JSON.stringify({ solved: true }),
		async: false,
		success: function (data) {
			console.log('해결 완료 업데이트 성공');
		},
		error: function () {
			alert('해결 완료 업데이트 실패');
		},
	});
}

// 해쉬태그 검색
function searchByHashtag(hashtag) {
	var posts = getAllPosts();
	var result;

	result = posts.filter((post) => {
		return post.hashtags.includes('#' + hashtag);
	});
	console.log(result);
	return result;
}

// 일반 검색
function searchByWord(word) {
	var posts = getAllPosts();
	var result;
	result = posts.filter((post) => {
		return post.title.includes(word) || post.content.includes(word);
	});
	console.log(result);
	return result;
}

// 특정 유저 게시글 불러오기
function getUserPost(userId) {
	var result;
	$.ajax({
		type: 'get',
		url: `http://localhost:3000/posts?userId=${userId}`,
		contentType: 'application/json',
		async: false,
		success: function (data) {
			result = data;
			console.log('post:', result);
		},
		error: function () {
			alert('실패');
		},
	});
	return result;
}

// 특정 유저 댓글 불러오기
function getUserComment(userId) {
	var result;
	$.ajax({
		type: 'get',
		url: `http://localhost:3000/comments?userId=${userId}`,
		contentType: 'application/json',
		async: false,
		success: function (data) {
			result = data;
			console.log('comments:', result);
		},
		error: function () {
			alert('실패');
		},
	});
	return result;
}

// 특정 유저가 댓글단 게시글 불러오기
function getUserCommentPosts(comments) {
	var result = [];
	comments.forEach((comment) => {
		var post = getPost(comment.postId);
		// console.log(post);
		result.push(post);
	});
	return result;
}
// 해쉬태그 추가
function addHashtag(userId, hashtag) {
	var user = getUser(userId);
	var hashtags = [...user.hashtags, '#' + hashtag];
	$.ajax({
		type: 'patch',
		url: `http://localhost:3000/users/${userId}`,
		contentType: 'application/json',
		data: JSON.stringify({ hashtags: hashtags }),
		async: false,
		success: function (data) {
			console.log('해쉬태그 업데이트 성공');
		},
		error: function () {
			alert('해쉬태그 업데이트 실패');
		},
	});
}

// 로그인한 유저 불러오기
function getLoginUser() {
	var result;
	$.ajax({
		type: 'get',
		url: `http://localhost:3000/users?login=true`,
		contentType: 'application/json',
		async: false,
		success: function (data) {
			result = data;
		},
		error: function () {
			alert('로그인 정보 불러오기 실패');
		},
	});
	return result[0];
}

// 로그인 바꾸기
function login(userId) {
	var user = getLoginUser();
	$.ajax({
		type: 'patch',
		url: `http://localhost:3000/users/${user.id}`,
		contentType: 'application/json',
		async: false,
		data: JSON.stringify({ login: false }),
		success: function (data) {
			console.log(user.id + '로그아웃');
		},
		error: function () {
			alert('로그아웃 실패');
		},
	});
	var newuser;
	$.ajax({
		type: 'patch',
		url: `http://localhost:3000/users/${userId}`,
		contentType: 'application/json',
		async: false,
		data: JSON.stringify({ login: true }),
		success: function (data) {
			newuser = data;
			console.log(userId + '로그인');
		},
		error: function () {
			alert('로그인 실패');
		},
	});
	return newuser;
}

// 댓글 좋아요
function addCommentLike(commendId, like) {
	$.ajax({
		type: 'patch',
		url: `http://localhost:3000/comments/${commendId}`,
		contentType: 'application/json',
		async: false,
		data: JSON.stringify({ like: like }),
		success: function (data) {
			console.log('좋아요 업데이트 성공');
		},
		error: function () {
			alert('좋아요 업데이트 실패');
		},
	});
}

// 댓글 삭제
function deleteComment(commentId) {
	$.ajax({
		type: 'delete',
		url: `http://localhost:3000/comments/${commentId}`,
		async: false,
		success: function (data) {
			console.log('삭제:', data);
		},
		error: function () {
			alert('댓글 삭제 실패');
		},
	});
}

// 게시글 신고
function addReport(postId, report) {
	if (report >= 10) {
		alert('신고에 의해 게시글이 삭제되었습니다.');
		window.location.href = 'index.html';
		deletePost(postId);
		return;
	}
	var data = { report: report };
	$.ajax({
		type: 'patch',
		url: `http://localhost:3000/posts/${postId}`,
		contentType: 'application/json',
		data: JSON.stringify(data),
		async: false,
		success: function (data) {
			console.log('게시글 신고 업데이트 성공');
		},
		error: function () {
			alert('게시글 신고 업데이트 실패');
		},
	});
}

// 댓글 신고
function addCommentReport(commentId, report) {
	if (report >= 10) {
		alert('신고에 의해 댓글이 삭제되었습니다.');
		deleteComment(commentId);
		return;
	}
	var data = { report: report };
	$.ajax({
		type: 'patch',
		url: `http://localhost:3000/comments/${commentId}`,
		contentType: 'application/json',
		data: JSON.stringify(data),
		async: false,
		success: function (data) {
			console.log('댓글 신고 업데이트 성공');
		},
		error: function () {
			alert('댓글 신고 업데이트 실패');
		},
	});
}
