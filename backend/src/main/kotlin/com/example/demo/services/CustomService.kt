package com.example.demo.services

import com.example.demo.controllers.models.CreateUserInput
import com.example.demo.controllers.models.CreateUserOutput
import com.example.demo.controllers.models.UserOutput
import com.example.demo.repositories.CustomRepository
import com.example.demo.repositories.User
import com.example.demo.services.utils.Hash
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import java.util.UUID

@Service
class CustomService(@Autowired val repo: CustomRepository) {

    fun createUser(input: CreateUserInput): CreateUserOutput {
        val id = UUID.randomUUID()
        repo.insert(User(
            id = id.toString(),
            name = input.name,
            password = Hash.of(input.password)
        ))
        return CreateUserOutput(
            id = id.toString(),
            token = UUID.randomUUID().toString()
        )
    }

    fun getUserById(uid: String): UserOutput {
        val user = repo.findByIdOrNull(uid) ?: throw IllegalStateException("User not found")
        return UserOutput(
            id = user.id,
            name = user.name
        )
    }

    fun getUsers(): List<UserOutput> {
        val users = repo.findAll()
        return users.map { u -> UserOutput(
            id = u.id,
            name = u.name
        )}
    }

    fun updateUser(uid: String, newUser: CreateUserInput) {
        val user = repo.findByIdOrNull(uid) ?: throw IllegalStateException("User not found")
        repo.save(user.copy(
            name = newUser.name,
            password = Hash.of(newUser.password)
        ))
    }

    fun deleteUser(uid: String) {
        val user = repo.findByIdOrNull(uid) ?: throw IllegalStateException("User not found")
        repo.delete(user)
    }

}