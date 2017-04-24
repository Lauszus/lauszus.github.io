---
---
$ -> window.youtube()

window.youtube = ->
  $('.youtube').each ->
    width = $(@).parent().width()
    width = 560 if width > 560 # Limit the width to 560 pixels
    height = width * 315/560 # Standard aspect ratio
    iframe = document.getElementById("#{@id}_iframe")
    if iframe
      if width != iframe.width
        iframe.width = width
      if height != iframe.height
        iframe.height = height
    else
      $(@).append "<iframe id=\"#{@id}_iframe\" width=\"#{width}\" height=\"#{height}\" src=\"http://www.youtube.com/embed/#{@id}\" frameborder=\"0\" allowfullscreen></iframe>"
