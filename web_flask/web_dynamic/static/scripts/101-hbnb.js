$(document).ready(function () {
  // Updates the status of the API
  $.getJSON('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });

  // Fetches and displays the reviews
  function fetchReviews (placeId) {
    $.getJSON(`http://0.0.0.0:5001/api/v1/places/${placeId}/reviews`, function (data) {
      $('.reviews li').remove();
      for (let review of data) {
        const date = new Date(review.created_at).toLocaleDateString();
        const html = `
          <li>
            <h3>From ${review.user_first_name} ${review.user_last_name} on ${date}</h3>
            <p>${review.text}</p>
          </li>
        `;
        $('.reviews').append(html);
      }
    });
  }

  // Toggles the visibility of the reviews
  $('.reviews-section span').click(function () {
    const $span = $(this);
    const $reviews = $('.reviews');
    const placeId = $reviews.data('place-id');
    if ($span.text() === 'show') {
      fetchReviews(placeId);
      $span.text('hide');
      $reviews.show();
    } else {
      $span.text('show');
      $reviews.hide();
    }
  });
});
