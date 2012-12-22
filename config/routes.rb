MoodFuse::Application.routes.draw do

	root :to => 'home#index'
	match '/search', :controller => 'home', :action => 'search'
	match '/about', :controller => 'home', :action => 'about'
	
end
