import { assets } from "../../assets/assets";
import { searchSchema } from "../../lib/validations/searchSchema";
import { useSearch } from "../../hooks/useRedux";
import { useForm } from "../../hooks/useFormHelper";
import { useNavigate } from "../../hooks/useNavigation";

const SearchBar = () => {
  const { go } = useNavigate();
  const { query, setQuery } = useSearch();

  const { register, handleSubmit, errors, isSubmitting } = useForm(
    searchSchema,
    async (data) => {
      setQuery(data.query);
      go(`/search/${encodeURIComponent(data.query)}`);
    },
    { defaultValues: { query: query || "" } },
  );

  return (
    <div className="w-full max-w-xl">
      <form
        onSubmit={handleSubmit}
        className="flex items-center w-full md:h-14 h-10 bg-white rounded border border-gray-300 pl-5"
      >
        <img src={assets.search_icon} alt="search" className="w-5 h-5" />

        <input
          type="text"
          placeholder="Search courses..."
          className="w-full h-full bg-transparent outline-none px-2"
          {...register("query")}
          aria-label="Search"
          aria-invalid={errors.query ? "true" : "false"}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white rounded md:px-10 px-7 md:py-3 py-2 mx-1 hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Searching..." : "Search"}
        </button>
      </form>

      {errors.query && (
        <p className="text-red-500 text-sm mt-1 ml-1">{errors.query.message}</p>
      )}
    </div>
  );
};

export default SearchBar;
