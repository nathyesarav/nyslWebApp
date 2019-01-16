




//=========== JSONs ==================

var schedule = {
  "september": [
    {"match": "1","date": "9/01","team1": "U1","team2": "U4","location": "AJ Katzenmaier","time": "9:30 a.m.","status": "end","score1": 4, "score2": 2},
    {"match": "2","date": "9/01","team1": "U3","team2": "U2","location": "Greenbay","time": "1:00 p.m.","status": "end","score1": 2,"score2": 3},
    {"match": "3","date": "9/08","team1": "U5","team2": "U6","location": "Howard A Yeager","time": "9:30 a.m.","status": "end","score1": 3,"score2": 5},
    {"match": "4","date": "9/08","team1": "U6","team2": "U1","location": "Marjorie P Hart","time": "1:00 p.m.","status": "end","score1": 2,"score2": 3},
    {"match": "5","date": "9/15","team1": "U2","team2": "U4","location": "North","time": "9:30 a.m.","status": "end","score1": 3,"score2": 3},
    {"match": "6","date": "9/15","team1": "U3","team2": "U5","location": "AJ Katzenmaier","time": "1:00 p.m.","status": "end","score1": 3,"score2": 2},
    {"match": "7","date": "9/22","team1": "U1","team2": "U3","location": "South","time": "9:30 a.m.","status": "end","score1": 6,"score2": 4},
    {"match": "8","date": "9/22","team1": "U3","team2": "U2","location": "Howard A Yeager","time": "1:00 p.m.","status": "end","score1": 4,"score2": 4},
    {"match": "9","date": "9/29","team1": "U4","team2": "U5","location": "Greenbay","time": "9:30 a.m.","status": "suspended","score1": null,"score2": null},
  ],
  "october": [
    {"match": "10","date": "10/06","team1": "U2","team2": "U5","location": "Marjorie P Hart","time": "9:30 a.m.","status": "to be played"},
    {"match": "11","date": "10/06","team1": "U1","team2": "U6","location": "South","time": "1:00 p.m.","status": "to be played"},
    {"match": "12","date": "10/13","team1": "U3","team2": "U4","location": "Howard A Yeager","time": "9:30 a.m.","status": "to be played"},
    {"match": "13","date": "10/13","team1": "U5","team2": "U1","location": "Greenbay","time": "1:00 p.m.","status": "to be played"},
    {"match": "14","date": "10/20","team1": "U6","team2": "U3","location": "North","time": "9:30 a.m.","status": "to be played"},
    {"match": "15","date": "10/20","team1": "U2","team2": "U4","location": "Marjorie P Hart","time": "1:00 p.m.","status": "to be played"},
    {"match": "16","date": "10/27","team1": "U3","team2": "U1","location": "AJ Katzenmaier","time": "9:30 a.m.","status": "to be played"},
    {"match": "17","date": "10/27","team1": "U3","team2": "U5","location": "Howard A Yeager","time": "1:00 p.m.","status": "to be played"},
  ],
};

var statistics = {
  "positions": [
    {"team": "U1", "position": 0, "played_games": 0, "won": 0, "tied": 0, "lost": 0, "points": 0},
    {"team": "U2", "position": 0,"played_games": 0, "won": 0, "tied": 0, "lost": 0, "points": 0},
    {"team": "U3", "position": 0,"played_games": 0, "won": 0, "tied": 0, "lost": 0, "points": 0},
    {"team": "U4", "position": 0,"played_games": 0, "won": 0, "tied": 0, "lost": 0, "points": 0},
    {"team": "U5", "position": 0,"played_games": 0, "won": 0, "tied": 0, "lost": 0, "points": 0},
    {"team": "U6", "position": 0,"played_games": 0, "won": 0, "tied": 0, "lost": 0, "points": 0},
  ],
};

var teams = {
  "U1": [
    {"first_name": "Daniel", "last_name": "Subasic"},
    {"first_name": "Mario", "last_name": "Mandzukic"},
    {"first_name": "Ivan", "last_name": "Rakitic"},
    {"first_name": "Domagoj", "last_name": "Vida"},
    {"first_name": "Ivan", "last_name": "Perisic"},
    {"first_name": "Luka", "last_name": "Modric"},
    {"first_name": "Ante", "last_name": "Rebic"},
    {"first_name": "Dejan", "last_name": "Lovren"},
  ]
};

//==================== Get Data From Firebase ========================================

 var sep = firebase.database().ref("september").once("value").then(function(snapshot){
  app.sepSch = snapshot.val();
}).then(function(){
   goToForum();
   getMap("AJ");
   getMap("Greenbay");
   getMap("Howard");
   getMap("Marjorie")
   getMap("North");
   getMap("South");
   getDetail();
 });

var oct = firebase.database().ref("october").once("value").then(function(snapshot){
  app.octSch = snapshot.val();
}).then(function(){
   goToForum();
   getMap("AJ");
   getMap("Greenbay");
   getMap("Howard");
   getMap("Marjorie")
   getMap("North");
   getMap("South");
   getDetail();
 });

//=============== Vue ===============

var app = new Vue({
  el: "#app",
  data: {
    sepSch: [],
    octSch: [],
    stats: statistics,
    u1: teams.U1,
  }
});

//=========== Maps =================

  function getMap (loc){
    $("."+loc+"").click(function(){
      $(".sch").removeClass("current");
      $("#"+loc+"-map").addClass("current");
    })
    function backSch (){
    $(".back-sch").click(function(){
      $("#"+loc+"-map").removeClass("current");
      $(".sch").addClass("current");
    })
    $("header .nav-link").click(function(){
      $("#"+loc+"-map").removeClass("current");
      $(".sch").addClass("current");
    })
  }
  backSch();
  }
  
//=========== Game Detail =============

function getDetail(){
  $(".end").click(function(){
    $(".sch").removeClass("current");
    $(".game-detail").addClass("current");
    for (i in app.sepSch){
      if ($(this).attr("id") != i){
        $(".game-detail .tr"+i+"").hide();
      }
    }
    
    })


function backSch2 (){
    $(".back-sch2").click(function(){
      $(".sch").addClass("current");
      $(".game-detail").removeClass("current");
      $(".game-detail tr").show();
    })
    $("header .nav-link").click(function(){
      $(".sch").addClass("current");
      $(".game-detail").removeClass("current");
      $(".game-detail tr").show();
    })
  }
  backSch2();
}
//=============== Forum =========================
    
function goToForum(){
    var clicked;
  $(".forum-btn").click(function(){
    clicked = $(this).attr("id");
    $(".sch").removeClass("current");
    $("#forum").addClass("current");
  })

function backSch3 (){
    $("#back-sch3").click(function(){
      $(".sch").addClass("current");
      $("#forum").removeClass("current "+clicked);
      $(".post").show();
    })
    $("header .nav-link").click(function(){
      $(".sch").addClass("current");
      $("#forum").removeClass("current "+clicked);
      $(".post").show();
    })
  }
  backSch3();
}
//================ Stats =========================

function Stats (){
  for (i in schedule.september){
  var obj = schedule.september;
  for (j in statistics.positions){
    var obj2 = statistics.positions;
    
    function WTL (){
      if (obj[i].score1 > obj[i].score2){
      if(obj[i].team1 == obj2[j].team){
        obj2[j].won += 1;
      } else if (obj[i].team2 == obj2[j].team){
        obj2[j].lost += 1;
      }
    } else if (obj[i].score1 < obj[i].score2){
        if(obj[i].team2 == obj2[j].team){
          obj2[j].won += 1;
        } else if (obj[i].team1 == obj2[j].team){
          obj2[j].lost += 1;
        }
      } else if (obj[i].score1 == obj[i].score2){
        if (obj[i].team1 == obj2[j].team){
          obj2[j].tied += 1; 
        } else if(obj[i].team2 == obj2[j].team){
          obj2[j].tied += 1;
        }
      }
    }
    WTL();
    
  }
}
}

Stats();

function PG (t){
  var PGarray = [];
  var pg;
  var countPG = schedule.september.map(function(x){
    if (x.team1 == t || x.team2 == t && x.status == "end"){
       PGarray.push($(this));
       
    }
    pg = PGarray.length;
  })
  statistics.positions.map(function(x){
    if (x.team == t){
      x.played_games = pg;
    }
  })
}
PG("U1");
PG("U2");
PG("U3");
PG("U4");
PG("U5");
PG("U6");

function Pts (){
  
  function sortNumber(a,b) {
    return b - a;
  }
  
  var pts;
  var posArray = [];
  statistics.positions.map(function(x){
    pts = x.won*3+x.tied*1;
    x.points = pts;
    posArray.push(x.points);
  })
  var posSort = posArray.sort(sortNumber);
  statistics.positions.map(function(x){
    posArray.map(function(y, index){
      if (x.points == y){
        x.position = index + 1;
      }
    })
  })

}

Pts();

//=========== Data Tables ====================

$(document).ready(function(){
  function rockTable(){
  $(".rock").dataTable({
    "bPaginate": false,
    fixedHeader: false,
    "bInfo": false,
    "searching": false,
  });
}
 rockTable();
})




//============ Transitions ===================


/*function slider(page){
  $('.nav-tabs a').on('show.bs.tab', function(){
  var toPage = $(page);
  var fromPage = $("#app .active");
  toPage.addClass("push in")
  fromPage.addClass("push out");
});
}

slider("#home");
slider("#schedule");
slider("#locations");
slider("#stats");



*/

//============ FORUM =============================


'use strict';


// Shortcuts to DOM Elements.
var messageForm = document.getElementById('message-form');
var messageInput = document.getElementById('new-post-message');
var titleInput = document.getElementById('new-post-title');
var signInButton = document.getElementById('sign-in-button');
var signOutButton = document.getElementById('sign-out-button');
var splashPage = document.getElementById('page-splash');
var addPost = document.getElementById('add-post');
var addButton = document.getElementById('add');
var recentPostsSection = document.getElementById('recent-posts-list');
var userPostsSection = document.getElementById('user-posts-list');
var topUserPostsSection = document.getElementById('top-user-posts-list');
var recentMenuButton = document.getElementById('menu-recent');
var myPostsMenuButton = document.getElementById('menu-my-posts');
var myTopPostsMenuButton = document.getElementById('menu-my-top-posts');
var listeningFirebaseRefs = [];

/**
 * Saves a new post to the Firebase DB.
 */
// [START write_fan_out]
function writeNewPost(uid, username, picture, title, body, matchid) {
  // A post entry.
  var postData = {
    author: username,
    uid: uid,
    body: body,
    title: title,
    starCount: 0,
    authorPic: picture,
    matchid: matchid
  };

  // Get a key for a new Post.
  var newPostKey = firebase.database().ref().child('posts').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  /*
  updates['/posts/' + newPostKey] = postData;
  updates['/user-posts/' + uid + '/' + newPostKey] = postData;
  */
  updates['forum/' + matchid + '/posts/' + newPostKey] = postData;
  updates['forum/' + matchid + '/user-posts/' + uid + '/' + newPostKey] = postData;

  return firebase.database().ref().update(updates);
}
// [END write_fan_out]

/**
 * Star/unstar post.
 */
// [START post_stars_transaction]
function toggleStar(postRef, uid) {
  postRef.transaction(function(post) {
    if (post) {
      if (post.stars && post.stars[uid]) {
        post.starCount--;
        post.stars[uid] = null;
      } else {
        post.starCount++;
        if (!post.stars) {
          post.stars = {};
        }
        post.stars[uid] = true;
      }
    }
    return post;
  });
}
// [END post_stars_transaction]

/**
 * Creates a post element.
 */
function createPostElement(postId, title, text, author, authorId, authorPic, matchid) {
  var uid = firebase.auth().currentUser.uid;
  //var MatchForum = $("#forum").attr("class");
  var html =
      '<div class="post ' + matchid + ' post-' + postId + ' mdl-cell mdl-cell--12-col ' +
                  'mdl-cell--6-col-tablet mdl-cell--4-col-desktop mdl-grid mdl-grid--no-spacing">' +
        '<div class="mdl-card mdl-shadow--2dp">' +
          '<div class="mdl-card__title mdl-color--light-blue-600 mdl-color-text--white">' +
            '<h4 class="mdl-card__title-text"></h4>' +
          '</div>' +
          '<div class="header">' +
            '<div>' +
              '<div class="avatar"></div>' +
              '<div class="username mdl-color-text--black"></div>' +
            '</div>' +
          '</div>' +
          '<span class="star">' +
            '<div class="not-starred material-icons">star_border</div>' +
            '<div class="starred material-icons">star</div>' +
            '<div class="star-count">0</div>' +
          '</span>' +
          '<div class="text"></div>' +
          '<div class="comments-container"></div>' +
          '<form class="add-comment" action="#">' +
            '<div class="mdl-textfield mdl-js-textfield">' +
              '<input class="mdl-textfield__input new-comment" type="text">' +
              '<label class="mdl-textfield__label">Comment...</label>' +
            '</div>' +
          '</form>' +
        '</div>' +
      '</div>';

  // Create the DOM element from the HTML.
  var div = document.createElement('div');
  div.innerHTML = html;
  var postElement = div.firstChild;
  if (componentHandler) {
    componentHandler.upgradeElements(postElement.getElementsByClassName('mdl-textfield')[0]);
  }

  var addCommentForm = postElement.getElementsByClassName('add-comment')[0];
  var commentInput = postElement.getElementsByClassName('new-comment')[0];
  var star = postElement.getElementsByClassName('starred')[0];
  var unStar = postElement.getElementsByClassName('not-starred')[0];

  // Set values.
  postElement.getElementsByClassName('text')[0].innerText = text;
  postElement.getElementsByClassName('mdl-card__title-text')[0].innerText = title;
  postElement.getElementsByClassName('username')[0].innerText = author || 'Anonymous';
  postElement.getElementsByClassName('avatar')[0].style.backgroundImage = 'url("' +
      (authorPic || './silhouette.jpg') + '")';

  // Listen for comments.
  // [START child_event_listener_recycler]
  var commentsRef = firebase.database().ref('forum/'+$("#forum").attr("class").split(' ')[2] +'/post-comments/' + postId);
  commentsRef.on('child_added', function(data) {
    addCommentElement(postElement, data.key, data.val().text, data.val().author);
  });

  commentsRef.on('child_changed', function(data) {
    setCommentValues(postElement, data.key, data.val().text, data.val().author);
  });

  commentsRef.on('child_removed', function(data) {
    deleteComment(postElement, data.key);
  });
  // [END child_event_listener_recycler]

  // Listen for likes counts.
  // [START post_value_event_listener]
  var starCountRef = firebase.database().ref('forum/'+$("#forum").attr("class").split(' ')[2] +'posts/' + postId + '/starCount');
  starCountRef.on('value', function(snapshot) {
    updateStarCount(postElement, snapshot.val());
  });
  // [END post_value_event_listener]

  // Listen for the starred status.
  var starredStatusRef = firebase.database().ref('forum/'+$("#forum").attr("class").split(' ')[2] +'posts/' + postId + '/stars/' + uid);
  starredStatusRef.on('value', function(snapshot) {
    updateStarredByCurrentUser(postElement, snapshot.val());
  });

  // Keep track of all Firebase reference on which we are listening.
  listeningFirebaseRefs.push(commentsRef);
  listeningFirebaseRefs.push(starCountRef);
  listeningFirebaseRefs.push(starredStatusRef);

  // Create new comment.
  addCommentForm.onsubmit = function(e) {
    e.preventDefault();
    createNewComment(postId, firebase.auth().currentUser.displayName, uid, commentInput.value);
    commentInput.value = '';
    commentInput.parentElement.MaterialTextfield.boundUpdateClassesHandler();
  };

  // Bind starring action.
  var onStarClicked = function() {
    var globalPostRef = firebase.database().ref('forum/'+$("#forum").attr("class").split(' ')[2] +'/posts/' + postId);
    var userPostRef = firebase.database().ref('forum/'+$("#forum").attr("class").split(' ')[2] +'/user-posts/' + authorId + '/' + postId);
    toggleStar(globalPostRef, uid);
    toggleStar(userPostRef, uid);
  };
  unStar.onclick = onStarClicked;
  star.onclick = onStarClicked;

  return postElement;
}

/**
 * Writes a new comment for the given post.
 */
function createNewComment(postId, username, uid, text) {
  firebase.database().ref('forum/'+$("#forum").attr("class").split(' ')[2] +'/post-comments/' + postId).push({
    text: text,
    author: username,
    uid: uid,
  });
}

/**
 * Updates the starred status of the post.
 */
function updateStarredByCurrentUser(postElement, starred) {
  if (starred) {
    postElement.getElementsByClassName('starred')[0].style.display = 'inline-block';
    postElement.getElementsByClassName('not-starred')[0].style.display = 'none';
  } else {
    postElement.getElementsByClassName('starred')[0].style.display = 'none';
    postElement.getElementsByClassName('not-starred')[0].style.display = 'inline-block';
  }
}

/**
 * Updates the number of stars displayed for a post.
 */
function updateStarCount(postElement, nbStart) {
  postElement.getElementsByClassName('star-count')[0].innerText = nbStart;
}

/**
 * Creates a comment element and adds it to the given postElement.
 */
function addCommentElement(postElement, id, text, author) {
  var comment = document.createElement('div');
  comment.classList.add('comment-' + id);
  comment.innerHTML = '<span class="username"></span><span class="comment"></span>';
  comment.getElementsByClassName('comment')[0].innerText = text;
  comment.getElementsByClassName('username')[0].innerText = author || 'Anonymous';

  var commentsContainer = postElement.getElementsByClassName('comments-container')[0];
  commentsContainer.appendChild(comment);
}

/**
 * Sets the comment's values in the given postElement.
 */
function setCommentValues(postElement, id, text, author) {
  var comment = postElement.getElementsByClassName('comment-' + id)[0];
  comment.getElementsByClassName('comment')[0].innerText = text;
  comment.getElementsByClassName('fp-username')[0].innerText = author;
}

/**
 * Deletes the comment of the given ID in the given postElement.
 */
function deleteComment(postElement, id) {
  var comment = postElement.getElementsByClassName('comment-' + id)[0];
  comment.parentElement.removeChild(comment);
}

/**
 * Starts listening for new posts and populates posts lists.
 */
function startDatabaseQueries() {
  // [START my_top_posts_query]
  var myUserId = firebase.auth().currentUser.uid;
  function getMatchForumId(){
    var id;
    $(".forum-btn").click(function(){
      id = $(this).attr("id");
    })
    return id;
  }
  var topUserPostsRef = firebase.database().ref('forum/'+  $("#forum").attr("class").split(' ')[2] + '/user-posts/' + myUserId).orderByChild('starCount');
  // [END my_top_posts_query]
  // [START recent_posts_query]
  var recentPostsRef = firebase.database().ref('forum/' +  $("#forum").attr("class").split(' ')[2] + '/posts').limitToLast(100);
  // [END recent_posts_query]
  var userPostsRef = firebase.database().ref('forum/' +  $("#forum").attr("class").split(' ')[2] + '/user-posts/' + myUserId);
  
  var fetchPosts = function(postsRef, sectionElement) {
    postsRef.on('child_added', function(data) {
      var author = data.val().author || 'Anonymous';
      var containerElement = sectionElement.getElementsByClassName('posts-container')[0];
      containerElement.insertBefore(
        createPostElement(data.key, data.val().title, data.val().body, author, data.val().uid, data.val().authorPic, data.val().matchid),
        containerElement.firstChild);
    });
    postsRef.on('child_changed', function(data) {
      var containerElement = sectionElement.getElementsByClassName('posts-container')[0];
      var postElement = containerElement.getElementsByClassName('post-' + data.key)[0];
      postElement.getElementsByClassName('mdl-card__title-text')[0].innerText = data.val().title;
      postElement.getElementsByClassName('username')[0].innerText = data.val().author;
      postElement.getElementsByClassName('text')[0].innerText = data.val().body;
      postElement.getElementsByClassName('star-count')[0].innerText = data.val().starCount;
    });
    postsRef.on('child_removed', function(data) {
      var containerElement = sectionElement.getElementsByClassName('posts-container')[0];
      var post = containerElement.getElementsByClassName('post-' + data.key)[0];
      post.parentElement.removeChild(post);
    });
  };

  // Fetching and displaying all posts of each sections.
  fetchPosts(topUserPostsRef, topUserPostsSection);
  fetchPosts(recentPostsRef, recentPostsSection);
  fetchPosts(userPostsRef, userPostsSection);

  // Keep track of all Firebase refs we are listening to.
  listeningFirebaseRefs.push(topUserPostsRef);
  listeningFirebaseRefs.push(recentPostsRef);
  listeningFirebaseRefs.push(userPostsRef);
}

/**
 * Writes the user's data to the database.
 */
// [START basic_write]
function writeUserData(userId, name, email, imageUrl) {
  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email,
    profile_picture : imageUrl
  });
}
// [END basic_write]

/**
 * Cleanups the UI and removes all Firebase listeners.
 */
function cleanupUi() {
  // Remove all previously displayed posts.
  topUserPostsSection.getElementsByClassName('posts-container')[0].innerHTML = '';
  recentPostsSection.getElementsByClassName('posts-container')[0].innerHTML = '';
  userPostsSection.getElementsByClassName('posts-container')[0].innerHTML = '';

  // Stop all currently listening Firebase listeners.
  listeningFirebaseRefs.forEach(function(ref) {
    ref.off();
  });
  listeningFirebaseRefs = [];
}

/**
 * The ID of the currently signed-in User. We keep track of this to detect Auth state change events that are just
 * programmatic token refresh but not a User status change.
 */
var currentUID;

/**
 * Triggers every time there is a change in the Firebase auth state (i.e. user signed-in or user signed out).
 */
function onAuthStateChanged(user) {
  // We ignore token refresh events.
  if (user && currentUID === user.uid) {
    return;
  }

  cleanupUi();
  if (user) {
    currentUID = user.uid;
    splashPage.style.display = 'none';
    writeUserData(user.uid, user.displayName, user.email, user.photoURL);
    startDatabaseQueries();
  } else {
    // Set currentUID to null.
    currentUID = null;
    // Display the splash page where you can sign-in.
    splashPage.style.display = '';
  }
}

/**
 * Creates a new post for the current user.
 */
function newPostForCurrentUser(title, text) {
  // [START single_value_read]
  var userId = firebase.auth().currentUser.uid;
  return firebase.database().ref(('/users/' + userId)).once('value').then(function(snapshot) { 
    var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
    // [START_EXCLUDE]
    return writeNewPost(firebase.auth().currentUser.uid, username,
      firebase.auth().currentUser.photoURL,
      title, text, $("#forum").attr("class").split(' ')[2]);
    // [END_EXCLUDE]
  });
  // [END single_value_read]
}

/**
 * Displays the given section element and changes styling of the given button.
 */
function showSection(sectionElement, buttonElement) {
  recentPostsSection.style.display = 'none';
  userPostsSection.style.display = 'none';
  topUserPostsSection.style.display = 'none';
  addPost.style.display = 'none';
  recentMenuButton.classList.remove('is-active');
  myPostsMenuButton.classList.remove('is-active');
  myTopPostsMenuButton.classList.remove('is-active');

  if (sectionElement) {
    sectionElement.style.display = 'block';
  }
  if (buttonElement) {
    buttonElement.classList.add('is-active');
  }
}

function go() {
  // Bind Sign in button.
  signInButton.addEventListener('click', function() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  });

  // Bind Sign out button.
  signOutButton.addEventListener('click', function() {
    firebase.auth().signOut();
  });

  // Listen for auth state changes
  firebase.auth().onAuthStateChanged(onAuthStateChanged);

  // Saves message on form submit.
  messageForm.onsubmit = function(e) {
    e.preventDefault();
    var text = messageInput.value;
    var title = titleInput.value;
    if (text && title) {
      newPostForCurrentUser(title, text).then(function() {
        myPostsMenuButton.click();
      });
      messageInput.value = '';
      titleInput.value = '';
    }
  };

  // Bind menu buttons.
  recentMenuButton.onclick = function() {
    showSection(recentPostsSection, recentMenuButton);
  };
  myPostsMenuButton.onclick = function() {
    showSection(userPostsSection, myPostsMenuButton);
  };
  myTopPostsMenuButton.onclick = function() {
    showSection(topUserPostsSection, myTopPostsMenuButton);
  };
  addButton.onclick = function() {
    showSection(addPost);
    messageInput.value = '';
    titleInput.value = '';
  };
  recentMenuButton.onclick();
};

// Bindings on load.

//  window.addEventListener('load', go , false);


$("#app").on("click", ".forum-btn", function(){
  var clicked = $(this).attr("id");
  $("#forum").addClass(clicked);
  onAuthStateChanged();
  go();
});


