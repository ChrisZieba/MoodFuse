class HomeController < ApplicationController

	include HomeHelper

	def index
	end

	def search
		mood = params[:mood]
		style = params[:style]

		render :json => getVideos(mood, style)
	end

	def about

	end
	

end
