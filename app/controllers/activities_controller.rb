class ActivitiesController < ApplicationController
  respond_to :html, :json
  layout "statuses"
  def index
    params[:page] ||= 1
    @activities = Activity.for_user(current_user, params)
    respond_with @activities
  end
end
