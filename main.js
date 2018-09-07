$(document).ready(function () {
    $('#searchGithubUser').on('keyup', function (e) {
        let username = e.target.value;

        $.ajax({
            url: 'https://api.github.com/users/' + username,
            data: {
                client_id: 'dea9098da04cc3b06ce6',
                client_secret: '911826b93e47c1d9f04cab02ae191976adb1ee37'
            }
        }).done(function (user) {
            $.ajax({
                url: 'https://api.github.com/users/' + username + '/repos',
                data: {
                    client_id: 'dea9098da04cc3b06ce6',
                    client_secret: '911826b93e47c1d9f04cab02ae191976adb1ee37'
                }
            }).done(function (repos) {
                $.each(repos, function (index, repo) {
                    $('#repos').append(`
              <div class="well">
                <div class="row">
                  <div class="col-md-7">
                    <strong>${repo.name}</strong> ${repo.description}
                  </div>
                  <div class="col-md-3">
                  <span class="label">Stargazers:${repo.stargazers_count}</span>
                  </div>
                </div>
              </div>
              `);
                });
            });

            $('#profileInformation').html(`
         <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">${user.name}</h3>
          </div>
          <div class="panel-body">
            <div class="row">
              <div class="col-md-3">
                <img style="width:100%" class="thumbnail" src="${user.avatar_url}">
                <br><br><a target="_blank" class="btn btn-primary btn-block" href="${user.html_url}">View Profile</a>
              </div>
              <div class="col-md-8>
              <span class="label">Public Repos: ${user.public_repos}</span>
              <span class="label">Public Gists: ${user.public_gists}</span>
              <span class="label">Followers: ${user.followers}</span>
              <span class="label">Following: ${user.following}</span>
              <br><br>
              <ul class="list-group">
                <li class="list-group-item">Location: ${user.location}</li>
              </ul>
              </div>
            </div>
          </div>
        </div>
        <br><br>
        <h3 class="page-header">Highest Repos</h3>
        <div id="repos"</div>
         `);


        });
    });
});
