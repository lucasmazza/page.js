require 'jasmine-headless-webkit'
require 'uglifier'

Jasmine::Headless::Task.new('spec') do |t|
  t.colors = true
  t.keep_on_error = true
  t.jasmine_config = 'spec/config.yml'
end

desc 'Minifies the page.js source'
task :bundle do
  source = File.read('lib/page.js')

  File.open('page.min.js', 'w') do |io|
    io.write(Uglifier.new.compile(source))
  end
end

task :default => :spec