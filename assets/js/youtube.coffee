---
---
$ ->
  $('.youtube').each ->
    width = $(this).attr('width')
    height = $(this).attr('height')
    $(@).append "<iframe width=\"#{width}\" height=\"#{height}\" src=\"http://www.youtube.com/embed/#{@id}\" frameborder=\"0\" allowfullscreen></iframe>"
