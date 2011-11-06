require 'jasmine-headless-webkit'

Jasmine::Headless::Task.new('spec') do |t|
  t.colors = true
  t.keep_on_error = true
  t.jasmine_config = 'spec/config.yml'
end

task :default => :spec