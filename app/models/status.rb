class Status < ActiveRecord::Base
  attr_accessible :content, :document_attributes, :state, :city
  belongs_to :user
  belongs_to :document

  accepts_nested_attributes_for :document

  validates :content, presence: true,
                      length: { minimum: 2 }

  validates :user_id, presence: true

  validates :state, presence: true

  validates :city, presence: true


end
