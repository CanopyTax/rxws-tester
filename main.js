chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('index.html', {
	    id: "rxwsTester",
			innerBounds: {
				width: 800,
				height: 800,
				minWidth: 244,
				minHeight: 380
			}
	  });
});
