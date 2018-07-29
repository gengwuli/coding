class ProblemsController < ApplicationController
	# problems GET        /problems(.:format)                        problems#index
    def index
        s = %w(Problem Category Solution Language).max { |x| x.constantize.send(:maximum, :updated_at) }
        last_modified_record = s.constantize.unscoped.order(:updated_at).last
        if stale?(last_modified_record)
            problems = Problem.includes(:solutions, :categories, :companies, :difficulty).all

            res = problems.map do |problem|
                categories = problem.categories.map(&:name).join(",")
                companies = problem.companies.map(&:name).join(",")
                difficulty = problem.difficulty.level
                no = problem.problem_no
                title = problem.title
                frequency = problem.frequency
                reference = problem.reference
                appendix = problem.appendix
                url = problem.url
                description = problem.description
                solutions = problem.solutions.map do |sol|  
                    {
                        "language" => sol.language,
                        "solution" => sol.solution
                    }
                end
                {
                    "problem_id" => no,
                    "title" => title,
                    "categories" => categories,
                    "companies" => companies,
                    "frequency" => frequency,
                    "solutions" => solutions,
                    "ref" => reference,
                    "append" => appendix,
                    "url" => url,
                    "difficulty" => difficulty,
                    "description" => description
                }
            end
            render json: res
        end
    end
end
