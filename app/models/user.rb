class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me,
                  :first_name, :last_name, :profile_name, :avatar
  
  validates :first_name, presence: true, length: { minimum: 2 },exclusion: { in: %w(Shit Piss Fuck Cunt Cocksucker Motherfucker Tits Ass Asshole Cock Bullshit Clit Cum Chink Coon Coochie Dago Dick Dyke Fag Faggot Goddamn Gook Heeb Jizz Kike Mofo Nigger Poonani Poontang Prick Pussy Snatch Spic Honky Skeet Taint Titties Twat Wetback Wigger Wop Pissed),
    message: "%{value} cannot be used as a First Name." }, length: { in: 1..20 }

  validates :last_name, presence: true, length: { minimum: 2 },exclusion: { in: %w(Shit Piss Fuck Cunt Cocksucker Motherfucker Tits Ass Asshole Cock Bullshit Clit Cum Chink Coon Coochie Dago Dick Dyke Fag Faggot Goddamn Gook Heeb Jizz Kike Mofo Nigger Poonani Poontang Prick Pussy Snatch Spic Honky Skeet Taint Titties Twat Wetback Wigger Wop Pissed),
    message: "%{value} cannot be used as a Last Name." }, length: { in: 1..20 }

  validates :password, length: { in: 6..20 }

  validates :avatar, presence: true

  validates :profile_name, presence: true,
                           uniqueness: true,
                           format: {
                             with: /^[a-zA-Z0-9_-]+$/,
                             message: 'Must be formatted correctly.'
                           },exclusion: { in: %w(Shit Piss Fuck Cunt Cocksucker Motherfucker Tits Ass Asshole Cock Bullshit Clit Cum Chink Coon Coochie Dago Dick Dyke Fag Faggot Goddamn Gook Heeb Jizz Kike Mofo Nigger Poonani Poontang Prick Pussy Snatch Spic Honky Skeet Taint Titties Twat Wetback Wigger Wop),
    message: "%{value} cannot be used as a Profile Name." }, length: { in: 1..20 }
  has_many :activities
  has_many :albums
  has_many :pictures
  has_many :statuses
  has_many :user_friendships
  has_many :friends, through: :user_friendships,
                     conditions: { user_friendships: { state: 'accepted' } }

  has_many :pending_user_friendships, class_name: 'UserFriendship',
                                      foreign_key: :user_id,
                                      conditions: { state: 'pending' }
  has_many :pending_friends, through: :pending_user_friendships, source: :friend
  
  has_many :requested_user_friendships, class_name: 'UserFriendship',
                                      foreign_key: :user_id,
                                      conditions: { state: 'requested' }
  has_many :requested_friends, through: :requested_user_friendships, source: :friend
  
  has_many :blocked_user_friendships, class_name: 'UserFriendship',
                                      foreign_key: :user_id,
                                      conditions: { state: 'blocked' }
  has_many :blocked_friends, through: :blocked_user_friendships, source: :friend
  
  has_many :accepted_user_friendships, class_name: 'UserFriendship',
                                      foreign_key: :user_id,
                                      conditions: { state: 'accepted' }
  has_many :accepted_friends, through: :accepted_user_friendships, source: :friend

  has_attached_file :avatar, styles: {
    large: "800x800>", medium: "300x200>", small: "260x180>", thumb: "80x80#"
  },
                :default_url => "s3_domain_url",
                :storage => :s3,
                :bucket => 'hschsc',
                :s3_credentials => {
      :access_key_id => 'AKIAIVQYSYGEQ22PQ4YA',
      :secret_access_key => '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'
    }

  validates_attachment_content_type :avatar, :content_type => /\Aimage\/.*\Z/

  def self.get_gravatars
    all.each do |user|
      if !user.avatar?
        user.avatar = URI.parse(user.gravatar_url)
        user.save
        print "."
      end
    end
  end

  def full_name
  	first_name + " " + last_name
  end

  def to_param
    profile_name
  end

  def to_s
    first_name
  end

  def gravatar_url
    stripped_email = email.strip
    downcased_email = stripped_email.downcase
    hash = Digest::MD5.hexdigest(downcased_email)

    "http://gravatar.com/avatar/#{hash}"
  end

  def has_blocked?(other_user)
    blocked_friends.include?(other_user)
  end

  def create_activity(item, action)
    activity = activities.new
    activity.targetable = item
    activity.action = action
    activity.save
    activity
  end

end