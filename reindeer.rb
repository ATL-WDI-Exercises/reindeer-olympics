STARTING_COLUMN = 80
RACE_DURATION = 2503

class Reindeer
  attr_reader :name, :position, :points

  def initialize(name, speed, fly_time, rest_time)
    @name = name
    @speed = speed
    @fly_time = fly_time
    @rest_time = rest_time

    @position = 0
    @points = 0
    @remaining_fly_time = @fly_time
    @remaining_rest_time = 0
  end

  private

  def flying?
    @remaining_fly_time > 0
  end

  def resting?
    @remaining_rest_time > 0
  end

  def start_flying
    @remaining_fly_time = @fly_time
  end

  def start_resting
    @remaining_rest_time = @rest_time
  end

  public

  def status
    if flying?
      "flying for #{@remaining_fly_time}"
    else
      "resting for #{@remaining_rest_time}"
    end
  end

  def step
    if flying?
      @remaining_fly_time -= 1
      @position += @speed
      start_resting unless flying?
    elsif resting?
      @remaining_rest_time -= 1
      start_flying unless resting?
    end
  end

  def award_point
    @points += 1
  end

  def debug_s
    "#{@name} : (#{@speed}, #{@fly_time}, #{@rest_time}) => " +
    "(#{@position}, #{@remaining_fly_time}, #{@remaining_rest_time})"
  end

  def to_s
    "(#{@position}, #{@points}) #{@name} #{status}"
  end
end

###### end of Reindeer

class ReindeerPrinter

  def initialize(reindeer)
    @reindeer = reindeer
  end

  def indent(num_spaces)
    # puts "num_spaces: #{num_spaces}"
    ' ' * (STARTING_COLUMN - num_spaces).floor
  end

  def print
    @reindeer.each do |deer|
      indent_str = indent(deer.position * 0.025)
      puts "#{indent_str}#{deer.to_s}"
    end
  end

  def figlet(message, delay)
    system "figlet -w 100 #{message}"
    sleep delay
    puts "\n\n\n\n\n"
  end
end

###### end of ReindeerPrinter

class ReindeerOlympics
  def initialize(reindeer)
    @reindeer = reindeer
    @printer = ReindeerPrinter.new(reindeer)
  end

  def award_points
    max_position = @reindeer.max_by(&:position).position
    @reindeer.each do |deer|
      deer.award_point if deer.position == max_position
    end
  end

  def play
    @printer.figlet("Welcome to the Reindeer Olympics!!!", 5)
    @printer.figlet("Greetings Reindeer...", 3)
    @printer.figlet("On Your Mark", 2)
    @printer.figlet("Get Set", 2)
    @printer.figlet("Go!", 0.3)

    @printer.print

    (1..RACE_DURATION).each do |t|
      puts "\nTime: #{t}"
      @reindeer.each do |deer|
        deer.step()
      end
      award_points
      @printer.print
      sleep 0.001
    end

    race_winner = @reindeer.max_by(&:position)
    points_winner = @reindeer.max_by(&:points)

    sleep 2
    @printer.figlet("Now for the", 0)
    @printer.figlet("Awards Ceremony", 3)
    @printer.figlet("Our Race Winner is...", 3)
    @printer.figlet("#{race_winner.name}", 2)
    @printer.figlet("with a total distance", 2)
    @printer.figlet("of #{race_winner.position} km", 5)
    @printer.figlet("And our points winner is...", 3)
    @printer.figlet("#{points_winner.name}", 2)
    @printer.figlet("With a total of", 2)
    @printer.figlet("#{points_winner.points} points!", 2)
    @printer.figlet("Farewell!", 0)
  end
end

ReindeerOlympics.new([
  Reindeer.new('Rudolph', 22,  8, 165),
  Reindeer.new('Cupid',    8, 17, 114),
  Reindeer.new('Prancer', 18,  6, 103),
  Reindeer.new('Donner',  25,  6, 145),
  Reindeer.new('Dasher',  11, 12, 125),
  Reindeer.new('Comet',   21,  6, 121),
  Reindeer.new('Blitzen', 18,  3,  50),
  Reindeer.new('Vixen',   20,  4,  75),
  Reindeer.new('Dancer',   7, 20, 119)
]).play
