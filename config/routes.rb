MoodFuse::Application.routes.draw do

	root :to => 'home#index'
	match '/terms', :controller => 'home', :action => 'terms'
	match '/privacy', :controller => 'home', :action => 'privacy'

	match '/about', :controller => 'home', :action => 'about'
	
end
