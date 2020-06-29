package rogue.rogueWebApp.Controller;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import rogue.rogueWebApp.Domain.Message;
import rogue.rogueWebApp.repo.MessageRepo;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@RestController
public class MessageController {
    @Autowired
    private AmazonS3 s3client;

    @Value("${endpointUrl}")
    private String endpointUrl;

    @Value("${bucketName}")
    private String bucketName;

    private final MessageRepo messageRepo;

    @Autowired
    public MessageController(MessageRepo messageRepo) {
        this.messageRepo = messageRepo;
    }

    @RequestMapping(value = "/get-messages", method = RequestMethod.GET)
    public List<Message> list(){
        return messageRepo.findAll();
    }

    @GetMapping("{id}")
    public Message getOne(@PathVariable("id") Message message){
        return message;
    }

    @RequestMapping(value = "/upload-image", method = RequestMethod.POST)
    public ResponseEntity<String> uploadFile(@RequestPart(value = "file") MultipartFile multipartFile)
    throws Exception {

        String fileUrl = "";
        String  status = null;
        try {
            File file = convertMultiPartToFile(multipartFile);
            String fileName = multipartFile.getOriginalFilename();
            fileUrl = endpointUrl + "/" + fileName;
            uploadFileTos3bucket(fileName, file);
            file.delete();
        } catch (Exception e) {
            return new ResponseEntity<String>("Image upload failed", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return ResponseEntity.ok(fileUrl);
    }

    @RequestMapping(value = "/upload-message", method = RequestMethod.POST)
    public Message create(@RequestBody Message message)  {
        message.setCreationDate(LocalDateTime.now());
        message.setId(new Random().nextLong());
        return messageRepo.save(message);
    }

    private File convertMultiPartToFile(MultipartFile file) throws IOException {
        File convFile = new File(file.getOriginalFilename());
        FileOutputStream fos = new FileOutputStream(convFile);
        fos.write(file.getBytes());
        fos.close();
        return convFile;
    }

    private void uploadFileTos3bucket(String fileName, File file) throws Exception {
        try {
            s3client.putObject(new PutObjectRequest(bucketName, fileName, file));
        } catch (AmazonServiceException e) {
            throw new Error("uploadFileTos3bucket().Uploading failed :" + e.getMessage());
        }
    }


    @PutMapping("{id}")
    public Message update(
            @PathVariable("id") Message messageFromDb,
            @RequestBody Message message
    ) {
        BeanUtils.copyProperties(message, messageFromDb, "id");
        return messageRepo.save(messageFromDb);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") Message message){
        messageRepo.delete(message);
    }
}
