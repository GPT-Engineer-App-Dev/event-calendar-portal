import { Box, Flex, Text, Button, VStack, HStack, useColorMode, useColorModeValue, IconButton } from "@chakra-ui/react";
import { FaSun, FaMoon, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useState } from "react";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Index = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("gray.100", "gray.700");
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const addMonth = (increment) => {
    const newDate = new Date(currentDate.setMonth(currentDate.getMonth() + increment));
    setCurrentDate(new Date(newDate));
  };

  const renderCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const startDay = new Date(year, month, 1).getDay();

    let days = [];
    for (let i = 0; i < startDay; i++) {
      days.push(<Box key={`empty-${i}`} flex="1" />);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(
        <Box key={day} flex="1" p="8" bg={bgColor} borderRadius="md">
          {day}
        </Box>,
      );
    }
    return days;
  };

  return (
    <VStack p="8" spacing="8">
      <Flex justifyContent="space-between" alignItems="center" w="full">
        <IconButton icon={<FaArrowLeft />} onClick={() => addMonth(-1)} aria-label="Previous month" />
        <Text fontSize="2xl">
          {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}
        </Text>
        <IconButton icon={<FaArrowRight />} onClick={() => addMonth(1)} aria-label="Next month" />
      </Flex>
      <Flex w="full">
        <Button onClick={toggleColorMode}>{colorMode === "light" ? <FaMoon /> : <FaSun />}</Button>
      </Flex>
      <Flex wrap="wrap" w="full">
        {daysOfWeek.map((day) => (
          <Box key={day} flex="1" p="8" fontWeight="bold">
            {day}
          </Box>
        ))}
        {renderCalendarDays()}
      </Flex>
    </VStack>
  );
};

export default Index;
