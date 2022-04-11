// search 버튼 클릭
$('.search-btn').on('click', function (e) {
	e.preventDefault();
	var hashtag = $('.search').val();
	console.log($('.search').val());
	console.log(hashtag);
	searchByHashtag(hashtag);
	window.location.href = `search.html?type=hashtag&word=${hashtag}`;
});

// 다른 계정 로그인
$('.login').on('click', function () {
	// console.log(this.getAttribute('user-id'));
	var new_user = this.getAttribute('user-id');
	login(new_user);
});
