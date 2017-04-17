---
---
$ ->
  $('.youtube').each ->
    width = $(this).parent().width();
    width = 560 if width > 560 # Limit the width to 560 pixels
    height = width * 315/560 # Standard aspect ratio
    $(@).append "<iframe width=\"#{width}\" height=\"#{height}\" src=\"http://www.youtube.com/embed/#{@id}\" frameborder=\"0\" allowfullscreen></iframe>"
