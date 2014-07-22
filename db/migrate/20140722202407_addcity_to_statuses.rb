class AddcityToStatuses < ActiveRecord::Migration
 def change
    add_column :statuses, :city, :string
  end
end
