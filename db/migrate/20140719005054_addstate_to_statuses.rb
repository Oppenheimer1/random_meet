class AddstateToStatuses < ActiveRecord::Migration
  def change
    add_column :statuses, :state, :string
  end
end
