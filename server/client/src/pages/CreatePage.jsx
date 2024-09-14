import { Box, Button, Container, Heading, Input, Textarea, useColorModeValue, useToast, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useBookStore } from "../store/book";

const CreatePage = () => {
	const [newBook, setNewBook] = useState({
		name: "",
		summary: "",
		image: "",
	});
	const toast = useToast();

	const { createBook } = useBookStore();

	const handleAddBook = async () => {
		const { success, message } = await createBook(newBook);
		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: message,
				status: "success",
				isClosable: true,
			});
		}
		setNewBook({ name: "", summary: "", image: "" });
	};

	return (
		<Container maxW={"container.sm"}>
			<VStack spacing={8}>
				<Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
					Create New Book
				</Heading>

				<Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
					<VStack spacing={4}>
						<Input
							placeholder='Book Title'
							name='name'
							value={newBook.name}
							onChange={(e) => setNewBook({ ...newBook, name: e.target.value })}
						/>
						<Textarea
							placeholder='Summary'
							name='summary'
							value={newBook.summary}
							onChange={(e) => setNewBook({ ...newBook, summary: e.target.value })}
						/>
						<Input
							placeholder='Image URL'
							name='image'
							value={newBook.image}
							onChange={(e) => setNewBook({ ...newBook, image: e.target.value })}
						/>

						<Button colorScheme='blue' onClick={handleAddBook} w='full'>
							Add Book
						</Button>
					</VStack>
				</Box>
			</VStack>
		</Container>
	);
};
export default CreatePage;