class ApplicationController < ActionController::Base
  

	before_filter :set_search

	def set_search
		@search=Status.search(params[:q])
	end

  protect_from_forgery

  rescue_from ActiveRecord::RecordNotFound, with: :render_404

  private
  def render_permission_error
    render file: 'public/permission_error', status: :error, layout: false
  end

  def render_404
    render file: 'public/404', status: :not_found
  end

end
