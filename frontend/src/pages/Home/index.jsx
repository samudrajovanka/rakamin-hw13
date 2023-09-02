import { useState } from "react";
import { Container } from "@chakra-ui/react";

import useFetch from "../../lib/hooks/useFetch";
import { getBooks } from "../../repositories/book";
import CardBooks from "../../components/CardBooks";
import CardBooksLoading from "../../components/CardBooksLoading";

const Home = () => {
  const [books, setBooks] = useState([]);

  const booksFetch = useFetch({
    apiFn: getBooks,
    onSuccess: (data) => {
      setBooks(data.books);
    }
  });

  return (
    <Container maxW="6xl" py={10}>
      {booksFetch.isLoading ? (
        <CardBooksLoading />
      ) : (
        <CardBooks books={books} refetchBooks={booksFetch.refetch} />
      )}
    </Container>
  )
}

export default Home;
